import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import globalStyles from "@assets/css/globalStyles";
import { useRouter } from "expo-router";
import { IProduct } from "@interfaces/types";

export default function UserProductCard(product: IProduct) {
	const router = useRouter();

	const openProductDetails = () => {
		if (product.id) {
			router.push({
				pathname: "/screens/product/[id]",
				params: { id: product.id, product: JSON.stringify(product) }
			});
		}
	};

	return (
		<TouchableOpacity
			style={[globalStyles.white_container, styles.row]}
			onPress={openProductDetails}
		>
			{product && (
				<>
					<Image source={{ uri: product.image }} style={styles.image_product} />
					<Text style={styles.text}>{product.category}</Text>
				</>
			)}
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	image_product: {
		width: 100,
		height: 100,
		borderRadius: 20,
	},
	row: {
		marginVertical: 10,
		justifyContent: "space-between",
		flexDirection: "row",
	},
	text: {
		fontSize: 20,
		paddingEnd: 30
	},
});
