import { db } from "@/services/firebase";
import { IRegister, IUser } from "@/interfaces/types";
import { collection, deleteDoc, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { deleteUser } from "firebase/auth";
import { useAuth } from "@services/context/AuthContext";

const fetchUserData = async (userId: string): Promise<IUser | null> => {
	try {
		const userRef = doc(db, "users", userId);
		const snapshot = await getDoc(userRef);

		// If the user data exists, return it. Otherwise, return null.
		if (snapshot.exists()) {
			const userData = snapshot.data() as IRegister;
			return { ...userData, userId };
		} else {
			console.error(`Корисникот со идентификациски број ${userId} не е пронајден.`);
			return null;
		}
	} catch (error) {
		console.error("Грешка при вчитување на податоци од горисникот:", error);
		return null;
	}
};

const fetchUserAddress = async (userId: string): Promise<{ latitude: string; longitude: string } | null> => {
	try {
		const userDoc = await getDoc(doc(db, "users", userId));

		if (userDoc.exists() && userDoc.data().address) {
			return userDoc.data().address;
		}
		else {
			return null;
		}
	} catch (error) {
		console.error("Error fetching user address:", error);
		throw error;
	}
};

const deleteUserAccount = async () => {
	const { user } = useAuth();

	if (!user) return;

	// Delete all user products
	const productsRef = collection(db, "products");
	const q = query(productsRef, where("userId", "==", user.uid));
	const querySnapshot = await getDocs(q);
	const deletePromises = querySnapshot.docs.map(productDoc =>
		deleteDoc(doc(db, "products", productDoc.id))
	);
	await Promise.all(deletePromises);

	// Delete user Firestore document
	await deleteDoc(doc(db, "users", user.uid));

	// Delete Firebase Auth user (must be last)
	await deleteUser(user);
};

// Add this function to the exported object of userService.
export default {
	fetchUserData,
	fetchUserAddress,
	deleteUserAccount
};
