import { db } from "@/app/firebase";
import { IRegister, IUser } from "@/interfaces/types";
import { doc, getDoc } from "firebase/firestore";

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

// Add this function to the exported object of userService.
export default {
	fetchUserData,
};
