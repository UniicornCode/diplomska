// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import { getAuth, initializeAuth, browserLocalPersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyAqImDWwbbQWHPgiEegR66SXrACUrZE79U",
	authDomain: "second-hand-firebase-app.firebaseapp.com",
	projectId: "second-hand-firebase-app",
	storageBucket: "second-hand-firebase-app.firebasestorage.app",
	messagingSenderId: "903522254954",
	appId: "1:903522254954:web:b6e6c53c9992fddbd30a13",
	measurementId: "G-SNTD358WQJ"
};

// Ensure Firebase is initialized only once
let app: FirebaseApp;
if (!getApps().length) {
	app = initializeApp(firebaseConfig);
} else {
	app = getApp(); // Use the existing app instance if it exists
}

// Initialize Auth with AsyncStorage for persistence
const auth = initializeAuth(app, {
	persistence: browserLocalPersistence, // This ensures persistence using AsyncStorage
});

// Initialize Firestore and Storage
const db = getFirestore(app);
const storage = getStorage(app);

// Initialize Realtime Database for future use
const dbRealtime = getDatabase(app, "https://second-hand-firebase-app-default-rtdb.europe-west1.firebasedatabase.app");  // Realtime Database initialization

export { app, auth, db, storage };
