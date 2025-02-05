// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
