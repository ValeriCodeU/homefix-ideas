const { setGlobalOptions } = require("firebase-functions/v2");
const { onRequest } = require("firebase-functions/v2/https");

const server = require("./server/server");

// Global configuration
setGlobalOptions({
    maxInstances: 1,
    region: "europe-west1"
});

// API
exports.api = onRequest((req, res) => {
    server.emit("request", req, res);
});