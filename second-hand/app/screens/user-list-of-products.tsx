import { ActivityIndicator, ImageBackground, ScrollView, StyleSheet, Text, View } from "react-native";
import globalStyles from "@assets/css/globalStyles";
import BackButton from "@components/buttons/BackButton";
import UserProductCard from "@components/containers/UserProductCard";
import React, { useState } from "react";
import { getFirestore, collection, query, where, getDocs, doc } from "firebase/firestore";
import { IProduct, IRegister } from "@interfaces/types";
import { useAuth } from "@services/context/AuthContext";
import { useFocusEffect } from "expo-router";
import Colors from "@/constants/Colors";

export default function UserListOfProducts() {
	const { user } = useAuth();
	const [products, setProducts] = useState<IProduct[]>([]);
	const [loading, setLoading] = useState(true); // Initialize loading state

	const db = getFirestore();

	useFocusEffect(() => {
		let isActive = true;

		const fetchUserProducts = async () => {
			if (user) {
				const userId = user.uid;
				const productsRef = collection(db, "products");
				const q = query(productsRef, where("userId", "==", userId));

				try {
					const snapshot = await getDocs(q);
					const productList: IProduct[] = [];

					snapshot.forEach((doc) => {
						const productData = doc.data() as IProduct;
						productList.push({ ...productData, id: doc.id })
					})

					if (isActive) {
						setProducts(productList);
					}
				} catch (error) {
					console.error("Error fetching products:", error);
				} finally {
					if (isActive) {
						setLoading(false);
					}
				}
			}
		}

		fetchUserProducts();

		// Clean up on blur/unmount
		return () => {
			isActive = false;
		};
	});

	return (
		<View style={globalStyles.background_transparent}>
			<ImageBackground
				source={require("@assets/images/background.png")}
				style={globalStyles.background}>
				<ScrollView>
					<Text style={[globalStyles.wide_title, styles.custom_width]}>
						МОИ ПРОДУКТИ
					</Text>
					<BackButton title={"Назад"} />
					<View style={[globalStyles.container]}>
						{loading ? (
							// Show a loading indicator while products are being fetched
							<ActivityIndicator size="large" color={Colors.primaryColor} />
						) : products.length ? (
							products.map((product, index) => (
								<View
									key={product.id}
									style={[
										styles.space_between,
										index === products.length - 1 && { marginBottom: 0 } // no margin after last card
										]}>
									<UserProductCard key={product.id} {...product} />
								</View>
							))
						) : (
							<View style={styles.empty_box}>
								<Text style={styles.description}>
									Немате додадено производи
								</Text>
							</View>
						)}
					</View>
				</ScrollView>
			</ImageBackground>
		</View>
	);
}

const styles = StyleSheet.create({
	custom_width: {
		maxWidth: 250,
		alignSelf: "center",
	},
	description: {
		alignSelf: "center",
		marginVertical: 20,
		textAlign: "center",
		fontSize: 18,
	},
	empty_box: {
		flex: 1,
		backgroundColor: "transparent",
		justifyContent: "center",
		alignItems: "center",
		flexDirection: "row",
	},
	space_between: {
		marginBottom: 10
	}
});
