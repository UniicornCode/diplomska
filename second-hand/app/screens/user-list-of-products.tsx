import { ActivityIndicator, ImageBackground, ScrollView, StyleSheet, Text, View } from "react-native";
import globalStyles from "@assets/css/globalStyles";
import BackButton from "@components/buttons/BackButton";
import UserProductCard from "@components/containers/UserProductCard";
import React, { useState } from "react";
import { IProduct, IRegister } from "@interfaces/types";
import { useAuth } from "@/services/context/AuthContext";
import Colors from "@/constants/Colors";
import productService from "@/services/productService";
import { useFocusEffect } from "expo-router";

export default function UserListOfProducts() {
	const { user } = useAuth();
	const [products, setProducts] = useState<IProduct[]>([]);
	const [loading, setLoading] = useState(true);

	useFocusEffect(() => {
		let isActive = true;

		const loadUserProducts = async () => {
			if (user) {
				try {
					const userProducts = await productService.fetchProductsByUser(user.uid);
					if (isActive) {
						setProducts(userProducts);
					}
				} catch (error) {
					console.error("Error loading user products:", error);
				} finally {
					if (isActive) {
						setLoading(false);
					}
				}
			}
		};

		loadUserProducts();

		// Cleanup function: Set isActive to false when the component is unmounted or when focus changes
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
