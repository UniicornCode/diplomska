import { db } from "@/app/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { IProduct } from "@/interfaces/types";

const fetchProductsByCategory = async (category: string): Promise<IProduct[]> => {
	try {
		const productsRef = collection(db, "products");
		const q = query(productsRef, where("category", "==", category));
		const snapshot = await getDocs(q);

		const products: IProduct[] = snapshot.docs.map(doc => ({
			id: doc.id,
			...doc.data()
		})) as IProduct[];

		return products;
	} catch (error) {
		console.error("Error fetching products:", error);
		throw error;
	}
};

export default {
	fetchProductsByCategory
};
