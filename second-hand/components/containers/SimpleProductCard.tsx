import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "expo-router";
import globalStyles from "../../assets/css/globalStyles";
import { IProduct } from "../../app/interfaces/types";

export default function SimpleProductCard(product: IProduct) {
	const navigation = useNavigation();

	const handleNavigation = () => {
		if (product.id) {
			navigation.navigate({
				name: "index",
				params: { screen: "screens/list-of-products", id: product.category, product: product },
			} as never);
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
				<Text>Боја: </Text>
				<View style={{ height: 20, backgroundColor: product.color, width: 100 }} />
			</View>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	title: {
		fontSize: 20,
		fontWeight: "bold",
		textAlign: "center",
		marginVertical: 20,
	},
});
