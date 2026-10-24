import { initializeApp } from 'firebase/app';
import { connectStorageEmulator, getStorage } from 'firebase/storage';

// The web config is public by design: it only tells the SDK which Firebase project to use.
// Access to the files is controlled by storage.rules.
const firebaseConfig = {
    apiKey: 'AIzaSyAttmhwK5HWbCLAiBN5eWku4RfETloJTmE',
    authDomain: 'homefix-ideas-app.firebaseapp.com',
    projectId: 'homefix-ideas-app',
    storageBucket: 'homefix-ideas-app.firebasestorage.app',
    messagingSenderId: '494373119042',
    appId: '1:494373119042:web:e5e0f09bee06c641bb39db',
};

const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);

// `npm run dev` works with the local emulators (`npm run server`), the production build with the real bucket.
if (import.meta.env.DEV) {
    connectStorageEmulator(storage, '127.0.0.1', 9199);
}
