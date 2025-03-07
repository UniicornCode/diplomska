import React, { createContext, useContext, useState, useEffect } from "react";
import { createUserWithEmailAndPassword } from "@firebase/auth";
import {
	getAuth,
	onAuthStateChanged,
	signInWithEmailAndPassword,
	signOut as signOutOfFirebase,
	User,
} from "firebase/auth";
import { ILogin, IRegister } from "../../interfaces/types";
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";
import { doc, setDoc, onSnapshot } from "firebase/firestore";
import { app, auth, db, storage } from "../../firebase";
import * as FileSystem from "expo-file-system";

interface AuthContextType {
	user: User | null;
	signIn: (data: ILogin) => Promise<void>;
	signUp: (data: IRegister) => Promise<void>;
	signOut: () => Promise<void>;
	userData: Partial<IRegister> | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthProviderProps = {
	children: React.ReactNode;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
	const [user, setUser] = useState<User | null>(null);
	const [userData, setUserData] = useState<Partial<IRegister> | null>(null);

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, setUser); // Refactored for Firebase v9
		return unsubscribe; // the function returned by onAuthStateChanged is the unsubscribe function
	}, [auth]);

	useEffect(() => {
		return onAuthStateChanged(auth, setUser);
	}, []);

	const signIn = async ({ email, password }: ILogin) => {
		await signInWithEmailAndPassword(auth, email, password); // Refactored for Firebase v9
	};

	const signOut = async () => {
		await signOutOfFirebase(auth); // Refactored for Firebase v9
	};

	const uploadImageAndGetURL = async (uri: string, uid: string) => {
		try {
			console.log("Original Image URI:", uri);

			// Read file as Base64
			const base64 = await FileSystem.readAsStringAsync(uri, { encoding: FileSystem.EncodingType.Base64 });

			// Convert Base64 to a Blob
			const byteCharacters = atob(base64);
			const byteNumbers = new Array(byteCharacters.length).fill(null).map((_, i) => byteCharacters.charCodeAt(i));
			const byteArray = new Uint8Array(byteNumbers);
			const blob = new Blob([byteArray], { type: "image/jpeg" });

			const imageRef = storageRef(storage, `profileImages/${uid}`);
			await uploadBytes(imageRef, blob);
			const downloadURL = await getDownloadURL(imageRef);

			return downloadURL;
		} catch (error) {
			console.error("Error in uploadImageAndGetURL:", error);
			throw error;
		}
	};

	const signUp = async (data: IRegister) => {
		try {
			const { password, ...additionalData } = data;
			const response = await createUserWithEmailAndPassword(auth, additionalData.email, password);
			const uid = response.user?.uid;

			if (!uid) {
				throw new Error("Failed to get UID after registration.");
			}

			// const profileImageUrl = await uploadImageAndGetURL(additionalData.selectedImage, uid);
			// additionalData.selectedImage = profileImageUrl;

			await setDoc(doc(db, "users", uid), {
				...additionalData, // Save all additional user data
				createdAt: new Date().toISOString(), // Optional: Store account creation timestamp
			});
		} catch (error: any) {
			console.error("Error in signUp: ", error.message);
			throw error; // Propagate the error so it can be caught outside.
		}
	};

	useEffect(() => {
		if (user && user.uid) {
			const userDocRef = doc(db, "users", user.uid);  // Reference to the Firestore document

			// Subscribe to real-time updates of the user's document
			const unsubscribe = onSnapshot(userDocRef, (snapshot) => {
				if (snapshot.exists()) {
					setUserData(snapshot.data());  // Set the data to state if document exists
				} else {
					setUserData(null);  // If document doesn't exist, clear the user data
				}
			});

			// Return a cleanup function to unsubscribe when component unmounts
			return () => unsubscribe();
		} else {
			setUserData(null);  // Clear userData if no user is logged in
		}
	}, [user]);

	return <AuthContext.Provider value={{ user, signIn, signOut, signUp, userData }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
};
