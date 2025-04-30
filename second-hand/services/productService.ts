import { db } from "@/services/firebase";
import { collection, query, where, getDocs, addDoc, setDoc, doc } from "firebase/firestore";
import { IProduct } from "@/interfaces/types";
import { Alert } from "react-native";

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

const fetchProductsByUser = async (userId: string): Promise<IProduct[]> => {
	try {
		const productsRef = collection(db, "products");
		const q = query(productsRef, where("userId", "==", userId));
		const snapshot = await getDocs(q);

		const products: IProduct[] = snapshot.docs.map(doc => ({
			id: doc.id,
			...doc.data()
		})) as IProduct[];

		return products;
	} catch (error) {
		console.error("Error fetching user products:", error);
		throw error;
	}
};

const addNewProduct = async (product: IProduct, userId: string): Promise<void> => {
	try {
		const newProduct = { ...product, userId: userId };

		// When we update a product
		if (product.id) {
			await setDoc(doc(db, "products", product.id), newProduct);
			Alert.alert("Успешно изменет производ");
		}
		// When we create a product
		else {
			await addDoc(collection(db, "products"), newProduct);
			Alert.alert("Успешно додаден нов производ");
		}
	} catch (error) {
		console.error("Error adding a product:", error);
		throw error;
	}
}

export default {
	fetchProductsByCategory,
	fetchProductsByUser,
	addNewProduct
};
