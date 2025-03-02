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
import { IProduct, IRegister } from "../interfaces/types";
import { useNavigation } from "expo-router";
import { getDatabase, ref, get } from "firebase/database";
import { useEffect, useState } from "react";
import { useAuth } from "../services/context/AuthContext";

export default function Product({ product }: { product: IProduct }) {
	const [seller, setSeller] = useState<IRegister>();

	const fetchUserData = async (userId: string) => {
		const db = getDatabase();
		const userRef = ref(db, `users/${userId}`);

		// Fetch the user data
		const snapshot = await get(userRef);

		// If the user data exists, return it. Otherwise, return null or throw an error.
		if (snapshot.exists()) {
			return snapshot.val();
		} else {
			console.error(`User with ID ${userId} not found.`);
			return null;
		}
	};

	const navigator = useNavigation();

	const goBack = () => {
		navigator.navigate({
			name: "index",
			params: { screen: "screens/list-of-products", id: product.category },
		} as never);
	};

	useEffect(() => {
		const effect = async () => {
			if (product.userId) {
				const userData = await fetchUserData(product.userId);
				if (userData) {
					setSeller(userData);
				}
			}
		};
		effect();
	}, [product]);


	const { user } = useAuth();

	return (
		<View style={globalStyles.background_transparent}>
			{/*TODO if there is a user logged in, get the userId*/}
			<ImageBackground source={require("../../assets/images/background.png")} style={globalStyles.background}>
				<ScrollView>
					<BackButton title={"Назад"} source={require("../../assets/images/back-icon.png")} goBack={goBack} />
					<View style={[globalStyles.container, globalStyles.shadow]}>
						<View style={globalStyles.white_container}>
							<Image source={{ uri: product.image }} style={globalStyles.cloth_image} />
							<View style={globalStyles.cloth_description}>
								<View>
									<Text style={styles.text}>Категорија</Text>
									<Text style={styles.text}>Големина</Text>
									<Text style={styles.text}>Бренд</Text>
									<Text style={styles.text}>Продавач</Text>
								</View>
								<View>
									<Text style={styles.text}>{product.category}</Text>
									<Text style={styles.text}>{product.size}</Text>
									<Text style={styles.text}>{product.brand}</Text>
									<Text style={styles.text}>{seller?.name}</Text>
								</View>
							</View>
						</View>
						<View style={styles.price}>
							<Text style={[globalStyles.text_white, styles.text]}>{product.price} ден.</Text>
						</View>
					</View>
				</ScrollView>
			</ImageBackground>
			{/*TODO The footer should be visible only if a user is logged in*/}
			{user && seller && <ContactFooter {...seller} />}
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
		marginVertical: 5,
	},
});
