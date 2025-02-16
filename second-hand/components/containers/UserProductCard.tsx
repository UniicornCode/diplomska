import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import globalStyles from "../../assets/css/globalStyles";
import { useNavigation } from "expo-router";
import { get, getDatabase, ref } from "firebase/database";
import { IProduct } from "../../app/interfaces/types";
import { useIsFocused } from "@react-navigation/native";
import { useAuth } from "@/app/services/context/AuthContext";

interface IProps {
	productId: string;
}

export default function UserProductCard({ productId }: IProps) {
	const navigator = useNavigation();
	const [product, setProduct] = useState<IProduct | null>(null);
	const user = useAuth();
	const [products, setProducts] = useState<IProduct[]>([]);
	const [loading, setLoading] = useState(true);
	const isFocused = useIsFocused();

	// Fetch the product data by productId
	const fetchProductById = async () => {
		const db = getDatabase();
		const productRef = ref(db, `products/${productId}`);

		try {
			const snapshot = await get(productRef);
			if (snapshot.exists()) {
				const productData = snapshot.val() as IProduct;
				setProduct(productData);
			} else {
				console.error(`Product with ID ${productId} not found.`);
			}
		} catch (error) {
			console.error("Error fetching product:", error);
		}
	};

	// Fetch product data when the screen is focused
	useEffect(() => {
		if (isFocused) {
			fetchProductById(); // Fetch the product data when the screen is focused
		}
	}, [isFocused]);

	//Navigate to the product details screen when clicking the product
	const openProductDetails = () => {
		if (product) {
			navigator.navigate({
				name: "index",
				params: { screen: "pages/list-of-products", id: product.category, product: product },
			} as never);
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
