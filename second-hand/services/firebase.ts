import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import { initializeAuth, browserLocalPersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Firebase configuration
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
	app = getApp(); // Use existing app instance if it exists
}

// Initialize Auth
const auth = initializeAuth(app);

// Initialize Firestore
const db = getFirestore(app);

// Export services
export { app, auth, db };
