import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useNavigation, useRouter } from "expo-router";
import globalStyles from "@assets/css/globalStyles";
import { IProduct } from "@interfaces/types";

export default function SimpleProductCard(product: IProduct) {
	const router = useRouter();

	const handleNavigation = () => {
		if (product.id) {
			router.push({
				pathname: "/screens/product",
				params: { product: JSON.stringify(product) }
			})
		}
	};

	return (
		<TouchableOpacity style={[globalStyles.simple_product, globalStyles.shadow]} onPress={handleNavigation}>
			<Image source={{ uri: product.image }} style={globalStyles.cloth_image} />
			<Text style={[globalStyles.text_white, styles.title]}>
				{product.brand} - {product.price} ден
			</Text>
			<View
				style={{
					flex: 1,
					backgroundColor: "transparent",
					justifyContent: "center",
					alignItems: "center",
					flexDirection: "row",
				}}>
			</View>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	title: {
		fontSize: 20,
		fontWeight: "bold",
		textAlign: "center",
		marginTop: 20,
		paddingHorizontal: 20
	}
});
