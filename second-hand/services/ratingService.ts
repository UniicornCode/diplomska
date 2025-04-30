import { db } from "@/services/firebase";
import { INewRating, IRating } from "@/interfaces/types";
import { collection, query, where, getDocs, addDoc, deleteDoc, doc, serverTimestamp, onSnapshot } from "firebase/firestore";
import { Alert } from "react-native";

const fetchRatingsForSeller = async (sellerId: string): Promise<IRating[]> => {
	try {
		const ratingsRef = collection(db, "ratings");
		const q = query(ratingsRef, where("sellerId", "==", sellerId));
		const querySnapshot = await getDocs(q);

		const ratings: IRating[] = querySnapshot.docs.map(doc => ({
			id: doc.id,
			...doc.data()
		})) as IRating[];

		return ratings;
	} catch (error) {
		console.error("Error fetching ratings:", error);
		throw error;
	}
};

const fetchRatingsForUser = async (userId: string): Promise<IRating[]> => {
	try {
		const ratingsRef = collection(db, "ratings");
		const q = query(ratingsRef, where("sellerId", "==", userId));
		const querySnapshot = await getDocs(q);

		const ratings: IRating[] = querySnapshot.docs.map(doc => ({
			id: doc.id,
			...doc.data()
		})) as IRating[];

		return ratings;
	}
	catch (error) {
		Alert.alert("Грешка", "Неуспешно превземање на оценки.");
		throw error;
	}
}

const addRating = async (ratingData: INewRating): Promise<void> => {
	try {
		await addDoc(collection(db, "ratings"), {
			...ratingData,
			createdAt: serverTimestamp()
		});
	} catch (error) {
		console.error("Error adding rating:", error);
		throw error;
	}
};

const deleteRating = async (ratingId: string): Promise<void> => {
	try {
		const ratingRef = doc(db, "ratings", ratingId);
		await deleteDoc(ratingRef);
	} catch (error) {
		console.error("Error deleting rating:", error);
		throw error;
	}
};

const listenToSellerRatings = (
	sellerId: string,
	callback: (ratings: number[]) => void
) => {
	const q = query(collection(db, "ratings"), where("sellerId", "==", sellerId));

	const unsubscribe = onSnapshot(q, (snapshot) => {
		const ratings = snapshot.docs.map(doc => doc.data().rating);
		callback(ratings);
	});

	return unsubscribe;
};

// ratingService.ts
export default {
	fetchRatingsForSeller,
	fetchRatingsForUser,
	addRating,
	deleteRating,
	listenToSellerRatings
};
