const { setGlobalOptions } = require("firebase-functions/v2");
const { onRequest } = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const { initializeApp } = require("firebase-admin/app");
const { getStorage } = require("firebase-admin/storage");

const server = require("./server/server");

// Global configuration
setGlobalOptions({
    maxInstances: 1,
    region: "europe-west1"
});

// Data persistence
// The Practice Server keeps its data in memory, and Cloud Run stops the instance after some time without requests.
// After every change the whole data is saved as one JSON file in Cloud Storage,
// and a new instance loads it before its first request.
// storage.rules do not open this path to the browser, only the Admin SDK can read it.
let dataFile = null;

// The Admin SDK is set up on the first request and not when this file loads,
// because the Firebase CLI gives the file only 10 seconds to load when it reads the functions
function getDataFile() {
    if (dataFile === null) {
        initializeApp();
        dataFile = getStorage()
            .bucket("homefix-ideas-app.firebasestorage.app")
            .file("practice-server/data.json");
    }

    return dataFile;
}

// In the emulator the file must go to the Storage emulator, never to the real bucket
const isEmulator = process.env.FUNCTIONS_EMULATOR === "true";
const canPersist = !isEmulator || process.env.FIREBASE_STORAGE_EMULATOR_HOST !== undefined;

if (!canPersist) {
    logger.warn("Storage emulator is not running, the data is kept only in memory");
}

let loading = null;
let saving = Promise.resolve();
let savedJson = "";

// The Practice Server also keeps the plain password from the registration form.
// Login checks only hashedPassword, so the password is never written to the file
function getDataJson() {
    const data = server.exportData();

    for (const user of Object.values(data.protectedData.users)) {
        delete user.password;
    }

    return JSON.stringify(data);
}

function loadData() {
    if (loading === null) {
        loading = getDataFile().download()
            .then(([contents]) => {
                server.importData(JSON.parse(contents.toString()));
                savedJson = getDataJson();
                logger.info("Data loaded from Cloud Storage");
            })
            .catch((err) => {
                // First start: there is no file yet, so the server keeps its seed data.
                // The file is created with the first real change
                if (err.code === 404) {
                    savedJson = getDataJson();
                    logger.info("No saved data yet, starting from the seed data");
                    return;
                }

                // Never continue with the seed data here, the next save would overwrite the real file.
                // The next request tries again.
                loading = null;
                throw err;
            });
    }

    return loading;
}

function saveData() {
    // The saves run one after another, so an older copy never overwrites a newer one
    saving = saving
        .then(async () => {
            const json = getDataJson();

            if (json === savedJson) {
                return;
            }

            await getDataFile().save(json, { contentType: "application/json", resumable: false });
            savedJson = json;
        })
        .catch((err) => {
            logger.error("Save data error", err);
        });

    return saving;
}

// GET requests only read data. The exception is logout, which deletes the session
function canChangeData(req) {
    if (req.method === "GET") {
        return req.path === "/users/logout";
    }

    return req.method !== "OPTIONS" && req.method !== "HEAD";
}

// API
exports.api = onRequest(async (req, res) => {
    if (canPersist) {
        try {
            await loadData();
        } catch (err) {
            logger.error("Load data error", err);
            res.set("Access-Control-Allow-Origin", "*");
            res.status(503).json({ code: 503, message: "Service Unavailable" });
            return;
        }

        if (canChangeData(req)) {
            // The Practice Server sends every response with res.end().
            // The data is saved before that, because Cloud Functions may stop the CPU once the response is sent
            const end = res.end.bind(res);

            res.end = (...args) => {
                saveData().then(() => end(...args));
                return res;
            };
        }
    }

    server.emit("request", req, res);
});
