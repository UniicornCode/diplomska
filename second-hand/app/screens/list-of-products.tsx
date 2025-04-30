import { ActivityIndicator, Alert, ImageBackground, ScrollView, StyleSheet, Text, View } from "react-native";
import SimpleProductCard from "@components/containers/SimpleProductCard";
import BackButton from "@components/buttons/BackButton";
import globalStyles from "@assets/css/globalStyles";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { IProduct } from "@interfaces/types";
import productService from "../services/productService";

export default function ListOfProducts() {
	const { category, navigatedFromCreatedProduct } = useLocalSearchParams<{ category: string, navigatedFromCreatedProduct: string }>();
	const [products, setProducts] = useState<IProduct[]>([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const effect = async () => {
			setLoading(true);

			try {
				const prod = await productService.fetchProductsByCategory(category);
				setProducts(prod);
			} catch (error) {
				Alert.alert("Грешка", "Не успеавме да ги вчитаме производите. Обидете се повторно.")
			} finally {
				setLoading(false);
			}
		};
		effect();
	}, [category]);

	return (
		<View style={[globalStyles.background_transparent]}>
			<ImageBackground source={require("@assets/images/background.png")} style={globalStyles.background}>
				<ScrollView>
					<BackButton title={"Назад"} screen={navigatedFromCreatedProduct === "true" ? "/(tabs)" : undefined} />
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
						<View style={styles.description_container}>
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
	},
	description_container: {
		flex: 1,
		backgroundColor: "transparent",
		justifyContent: "center",
		alignItems: "center",
		flexDirection: "row",
	}
});
