import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useRouter } from "expo-router";
import { IProduct } from "@interfaces/types";
import { getFirestore, deleteDoc, doc } from "@firebase/firestore";
import Colors from "@/constants/Colors";
import globalStyles from "@/assets/css/globalStyles";
import { Icon } from "@rneui/themed";

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

	const editProduct = () => {
		if (product.id) {
			router.push({
				pathname: "/screens/create-edit-product",
				params: { product: JSON.stringify(product) }
			});
		}
	};

	const deleteProduct = async () => {
		if (product.id) {
			try {
				const db = getFirestore();
				await deleteDoc(doc(db, "products", product.id));
				alert("Успешно избришан производ!");
			} catch (error: any) {
				alert(error.message);
			}
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
					<TouchableOpacity onPress={deleteProduct} style={styles.iconButton}>
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
