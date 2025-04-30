import {
	Image,
	ImageBackground,
	ScrollView,
	StyleSheet,
	Text,
	View,
} from "react-native";
import globalStyles from "@/assets/css/globalStyles";
import BackButton from "@/components/buttons/BackButton";
import ContactFooter from "@/components/global/ContactFooter";
import { IProduct, IUser } from "@interfaces/types";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { useAuth } from "@/services/context/AuthContext";
import userService from "@/services/userService";

export default function Product() {
	const { product: productString } = useLocalSearchParams();
	const product: IProduct = productString ? JSON.parse(productString as string) : null;
	const { user } = useAuth();
	const [seller, setSeller] = useState<IUser>();

	useEffect(() => {
		const effect = async () => {
			if (product.userId) {
				const userData = await userService.fetchUserData(product.userId);
				if (userData) {
					setSeller(userData);
				}
			}
		};
		effect();
	}, [product]);

	return (
		<View style={globalStyles.background_transparent}>
			<ImageBackground source={require("@assets/images/background.png")} style={globalStyles.background}>
				<ScrollView>
					<BackButton title={"Назад"} />
					<View style={[globalStyles.container, globalStyles.shadow]}>
						<View style={globalStyles.white_container}>
							<Image source={{ uri: product.image }} style={globalStyles.cloth_image} />
							<View style={styles.info_container}>
								<View style={styles.row}>
									<Text style={styles.title} numberOfLines={1}>Категорија</Text>
									<Text style={styles.value} numberOfLines={2} ellipsizeMode="tail">{product.category}</Text>
								</View>

								<View style={styles.row}>
									<Text style={styles.title} numberOfLines={1}>Големина</Text>
									<Text style={styles.value} numberOfLines={2} ellipsizeMode="tail">{product.size}</Text>
								</View>

								<View style={styles.row}>
									<Text style={styles.title} numberOfLines={1}>Бренд</Text>
									<Text style={styles.value} numberOfLines={2} ellipsizeMode="tail">{product.brand}</Text>
								</View>

								<View style={styles.row}>
									<Text style={styles.title} numberOfLines={1}>Продавач</Text>
									<Text style={styles.value} numberOfLines={2} ellipsizeMode="tail">{seller?.name}</Text>
								</View>

								<View style={styles.row}>
									<Text style={styles.title} numberOfLines={1}>Боја</Text>
									<Text style={[styles.color, { backgroundColor: product.color }]} numberOfLines={1} ellipsizeMode="tail"></Text>
								</View>
							</View>
						</View>
						<View style={styles.price}>
							<Text style={[globalStyles.text_white, styles.text]}>{product.price} ден.</Text>
						</View>
					</View>
				</ScrollView>
			</ImageBackground>
			{/* Check if the user that is logged in is not the seller of this product, and the user and seller exist and then show the ContactFooter  */}
			{user && user?.uid !== seller?.userId && seller && <ContactFooter seller={seller} />}
		</View>
	);
}

const styles = StyleSheet.create({
	price: {
		alignItems: "center",
		marginVertical: 10,
	},
	text: {
		fontSize: 18,
		marginTop: 5,
	},
	contain_rows: {
		flex: 1
	},
	row: {
		flexDirection: "row",
		justifyContent: "space-between",
	},
	title: {
		fontSize: 18,
		fontWeight: 'bold',
		maxWidth: '50%',
		flex: 1,
		paddingVertical: 5
	},
	value: {
		fontSize: 18,
		maxWidth: '50%',
		flex: 2,
		paddingVertical: 5
	},
	info_container: {
		width: "90%",
		marginVertical: 20
	},
	color: {
		width: 50,
		height: 20,
		alignSelf: "center",
		flex: 1
	}
});
