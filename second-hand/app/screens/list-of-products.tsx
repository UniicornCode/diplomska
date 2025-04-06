import { ActivityIndicator, ImageBackground, ScrollView, StyleSheet, Text, View } from "react-native";
import SimpleProductCard from "@components/containers/SimpleProductCard";
import BackButton from "@components/buttons/BackButton";
import globalStyles from "@assets/css/globalStyles";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { IProduct } from "@interfaces/types";
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";
import Navbar from "@/components/global/Navbar";


export default function ListOfProducts() {
	const { category } = useLocalSearchParams<{ category: string }>();
	const [products, setProducts] = useState<IProduct[]>([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const fetchProductsByCategory = async (category: string): Promise<IProduct[]> => {
		try {
			const db = getFirestore(); // Initialize Firestore
			const productsRef = collection(db, "products"); // Reference to 'products' collection
			const q = query(productsRef, where("category", "==", category)); // Firestore query

			const snapshot = await getDocs(q);
			const products: IProduct[] = [];

			snapshot.forEach((doc) => {
				products.push({ id: doc.id, ...doc.data() } as IProduct);
			});

			return products;
		} catch (error) {
			console.error("Error fetching products:", error);
			throw error;
		}
	};

	useEffect(() => {
		const effect = async () => {
			setLoading(true);
			setError(null);

			try {
				const prod = await fetchProductsByCategory(category);
				setProducts(prod);
			} catch (error) {
				setError("Не успеавме да ги вчитаме производите. Обидете се повторно.");
			} finally {
				setLoading(false);
			}
		};
		effect();
	}, [category]);

	return (
		<View style={[globalStyles.background_transparent]}>
			<ImageBackground source={require("../../assets/images/background.png")} style={globalStyles.background}>
				<Navbar />
				<ScrollView>
					<BackButton title={"Назад"} source={require("../../assets/images/back-icon.png")} />
					<View style={styles.center}>
						<Text style={styles.text}>{category}</Text>
					</View>
					{loading ? (
						<ActivityIndicator size="large" color="#0000ff" />
					) : products.length ? (
						<>
							{products.map((product) => (
								<SimpleProductCard key={product.id} {...product} />
							))}
						</>
					) : (
						<View
							style={{
								flex: 1,
								backgroundColor: "transparent",
								justifyContent: "center",
								alignItems: "center",
								flexDirection: "row",
							}}>
							<Text style={styles.description}>Не се пронајдени производи за ова категорија</Text>
						</View>
					)}
				</ScrollView>
			</ImageBackground>
		</View>
	);
}

const styles = StyleSheet.create({
	center: {
		display: "flex",
		alignSelf: "center",
		justifyContent: "center",
	},
	text: {
		fontSize: 30,
		fontWeight: "bold",
		color: '#7891D3',
		marginTop: 20
	},
	description: {
		alignSelf: 'center',
		marginVertical: 20,
		textAlign: 'center',
		fontSize: 18
	}
});
