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
import { getDatabase, onValue, ref, set, off } from "firebase/database";
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";

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

	const auth = getAuth(); // get the Auth instance

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
		const storage = getStorage();
		const imageRef = storageRef(storage, `profileImages/${uid}`);

		const response = await fetch(uri);
		const blob = await response.blob();

		await uploadBytes(imageRef, blob);
		const downloadURL = await getDownloadURL(imageRef);

		return downloadURL;
	};

	const signUp = async (data: IRegister) => {
		try {
			const { password, ...additionalData } = data;
			const response = await createUserWithEmailAndPassword(auth, additionalData.email, password);
			const uid = response.user?.uid;

			if (!uid) {
				throw new Error("Failed to get UID after registration.");
			}

			const profileImageUrl = await uploadImageAndGetURL(additionalData.selectedImage, uid);
			additionalData.selectedImage = profileImageUrl;
			additionalData.email = additionalData.email;
			const db = getDatabase();
			const userRef = ref(db, "users/" + uid);
			await set(userRef, additionalData);
		} catch (error: any) {
			console.error("Error in signUp: ", error.message);
			throw error; // Propagate the error so it can be caught outside.
		}
	};

	useEffect(() => {
		if (user && user.uid) {
			const db = getDatabase();
			const userRef = ref(db, "users/" + user.uid);

			const unsubscribe = onValue(userRef, (snapshot) => {
				const data = snapshot.val();
				setUserData(data);
			});

			// Return a cleanup function to unsubscribe from the realtime listener
			return () => off(userRef, "value", unsubscribe);
		} else {
			setUserData(null); // clear userData if no user is logged in
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
