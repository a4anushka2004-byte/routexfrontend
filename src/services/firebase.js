import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

// TODO: Replace with your actual Firebase project configuration
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

export const requestForToken = async () => {
    try {
        const currentToken = await getToken(messaging, {
            vapidKey: "YOUR_VAPID_KEY" // TODO: Add your public VAPID key
        });
        if (currentToken) {
            console.log("Current token for client: ", currentToken);
            // Optionally send this token to your server
        } else {
            console.log("No registration token available. Request permission to generate one.");
        }
    } catch (err) {
        console.log("An error occurred while retrieving token. ", err);
    }
};

export const onMessageListener = () =>
    new Promise((resolve) => {
        onMessage(messaging, (payload) => {
            console.log("Payload received: ", payload);
            resolve(payload);
        });
    });
