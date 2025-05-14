import React from "react";
import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useRouter } from "expo-router";
import { IProduct } from "@interfaces/types";
import Colors from "@/constants/Colors";
import globalStyles from "@/assets/css/globalStyles";
import { Icon } from "@rneui/themed";
import productService from "@/services/productService";

interface UserProductCardProps {
	product: IProduct;
	deleteModal: () => void;
}

export default function UserProductCard({ product, deleteModal }: UserProductCardProps) {
	const router = useRouter();

	const openProductDetails = () => {
		if (product.id) {
			router.push({
				pathname: "/screens/product",
				params: { product: JSON.stringify(product) }
			});
		}
	};

	const editProduct = () => {
		if (product.id) {
			router.push({
				pathname: "/screens/create-edit-product",
				params: { product: JSON.stringify(product) }
			});
		}
	};

	return (
		<View style={globalStyles.white_container}>
			<TouchableOpacity onPress={openProductDetails} style={styles.row}>
				<Image source={{ uri: product.image }} style={styles.image_product} />

				<Text style={styles.text}
					numberOfLines={2}
					ellipsizeMode="tail">{product.category}</Text>

				<View style={styles.iconsContainer}>
					<TouchableOpacity onPress={editProduct} style={styles.iconButton}>
						<Icon name="pencil" type="entypo" size={24} color="black" />
					</TouchableOpacity>
					<TouchableOpacity onPress={() => deleteModal()} style={styles.iconButton}>
						<Icon name="delete" type="materialicons" size={24} color={Colors.deleteColor} />
					</TouchableOpacity>
				</View>
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	image_product: {
		width: 100,
		height: 100,
		borderRadius: 20,
	},
	row: {
		alignItems: "center",
		flexDirection: "row"
	},
	text: {
		alignSelf: "center",
		fontSize: 18,
		paddingHorizontal: 10,
		flex: 1
	},
	iconsContainer: {
		flexDirection: 'row',
		alignItems: 'center'
	},
	iconButton: {
		paddingRight: 5,
	}
});
