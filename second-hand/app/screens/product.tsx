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
import { IProduct, IRegister, IUser } from "@interfaces/types";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { useAuth } from "@services/context/AuthContext";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@app/firebase"

export default function Product() {
	const { product: productString } = useLocalSearchParams();
	const product: IProduct = productString ? JSON.parse(productString as string) : null;
	const { user } = useAuth();
	const [seller, setSeller] = useState<IUser>();

	const fetchSellerData = async (userId: string): Promise<IUser | null> => {
		try {
			const userRef = doc(db, "users", userId);
			const snapshot = await getDoc(userRef);

			// If the user data exists, return it. Otherwise, return null or throw an error.
			if (snapshot.exists()) {
				const userData = snapshot.data() as IRegister;
				return { ...userData, userId };
			} else {
				console.error(`User with ID ${userId} not found.`);
				return null;
			}
		} catch (error) {
			console.error("Error fetching user data:", error)
			return null;
		}
	};

	useEffect(() => {
		const effect = async () => {
			if (product.userId) {
				const userData = await fetchSellerData(product.userId);
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
									<Text style={[styles.color, {backgroundColor: product.color}]} numberOfLines={1} ellipsizeMode="tail"></Text>
								</View>
							</View>
						</View>
						<View style={styles.price}>
							<Text style={[globalStyles.text_white, styles.text]}>{product.price} ден.</Text>
						</View>
					</View>
				</ScrollView>
			</ImageBackground>
			{user?.uid !== seller?.userId && <ContactFooter {...seller} />}
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
