import {
	ImageBackground,
	KeyboardAvoidingView,
	Platform,
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";
import globalStyles from "@assets/css/globalStyles";
import BackButton from "@components/buttons/BackButton";
import StarRating from "@components/custom/StarRating";
import MyProductsButton from "@components/buttons/MyProductsButton";
import { useRouter } from "expo-router";
import { useAuth } from "@/services/context/AuthContext";
import { useEffect, useState } from "react";
import DeleteProfileModal from "@components/custom/DeleteProfileModal";
import SecondaryButton from "@components/buttons/SecondaryButton";
import Colors from "@constants/Colors";
import { calculateAverageRating } from "@/utils/CalculateAverageRating";
import MyRatingsButton from "@components/buttons/MyRatingsButton";
import { IUser } from "@interfaces/types";
import RatingService from "@/services/ratingService";
import userService from "@/services/userService";

export default function UserProfile() {
	const router = useRouter();
	const { signOut, userData, user } = useAuth();
	const [seller, setSeller] = useState<IUser | null>(null); // Send user data as seller for ratings view
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [averageRating, setAverageRating] = useState<number>(0);

	const changeHandler = (name: string, value: string) => { };

	const openUserProducts = () => {
		router.push({
			pathname: "/screens/user-list-of-products"
		});
	};

	const openUserRatings = () => {
		router.push({
			pathname: "/screens/list-of-ratings",
			params: { seller: JSON.stringify(seller) }
		});
	};

	const logOut = () => {
		signOut();
		router.replace("/screens/login");
	};

	const loadUserRatings = async () => {
		if (!user) return;

		const ratings = await RatingService.fetchRatingsForUser(user.uid);
		const average = calculateAverageRating(ratings.map(r => r.rating));
		setAverageRating(average);
	};

	const deleteUserAccount = async () => {
		try {
			await userService.deleteUserAccount(user);
			router.replace("/(tabs)");
		} catch (error: any) {
			console.error("Error deleting account:", error.message);
		}
	};

	useEffect(() => {
		loadUserRatings();
	}, []);

	useEffect(() => {
		if (user && userData) {
			setSeller({
				selectedImage: userData.selectedImage ?? "",
				name: userData.name ?? "",
				surname: userData.surname ?? "",
				email: userData.email ?? "",
				address: userData.address ?? { latitude: "", longitude: "" },
				phone: userData.phone ?? "",
				password: userData.password ?? "",
				userId: user.uid
			});
		}
	}, [user, userData]);

	return (
		<KeyboardAvoidingView
			style={globalStyles.background_transparent}
			behavior={Platform.OS === "ios" ? "padding" : "height"}>
			<ImageBackground source={require("@assets/images/background.png")} style={globalStyles.background}>
				<ScrollView>
					<Text style={[globalStyles.wide_title]}>МОЈ ПРОФИЛ</Text>
					<BackButton title={"Назад"} />
					<View style={[globalStyles.container, globalStyles.shadow]}>
						<TextInput
							style={globalStyles.input_field}
							placeholder="Име"
							value={userData?.name}
							editable={false}
							onChangeText={changeHandler.bind(null, "name")}
						/>

						<TextInput
							style={globalStyles.input_field}
							placeholder="Презиме"
							value={userData?.surname}
							editable={false}
							onChangeText={changeHandler.bind(null, "surname")}
						/>

						<TextInput
							style={globalStyles.input_field}
							keyboardType="email-address"
							placeholder="Емаил"
							value={userData?.email}
							editable={false}
							onChangeText={changeHandler.bind(null, "email")}
						/>

						<TextInput
							style={globalStyles.input_field}
							keyboardType="phone-pad"
							placeholder="Телефон"
							value={userData?.phone}
							onChangeText={changeHandler.bind(null, "phone")}
						/>

						{/* <Button title="Зачувај" onPress={() => {}} /> */}
						<MyProductsButton onPress={openUserProducts} />

						<MyRatingsButton onPress={openUserRatings} />

						<Text style={styles.text}>Просечен рејтинг:</Text>
						<StarRating rating={averageRating} isDisabled={true} />
					</View>

					<View style={{ marginBottom: 40 }}>
						<SecondaryButton
							title="Одјави се"
							onPress={logOut}
						/>

						<SecondaryButton
							title="Избриши Профил"
							onPress={() => setShowDeleteModal(true)}
							backgroundColor={Colors.deleteColor}
						/>
					</View>
				</ScrollView>
				<DeleteProfileModal visible={showDeleteModal}
					onConfirm={async () => {
						await deleteUserAccount()
						setShowDeleteModal(false)
					}}
					onCancel={() => setShowDeleteModal(false)} />
			</ImageBackground>
		</KeyboardAvoidingView>
	);
}

const styles = StyleSheet.create({
	two_buttons: {
		paddingVertical: 20,
		width: 250,
		flexGrow: 1,
		alignSelf: "center",
		justifyContent: "space-between",
		flexDirection: "row",
	},
	text: {
		alignSelf: "center",
		fontSize: 20,
		color: "white",
	},
	textBtn: {
		textAlign: "center",
		fontSize: 18,
	},
	button: {
		height: 40,
		marginVertical: 20,
		paddingHorizontal: 20,
		alignSelf: "center",
		alignItems: "center",
		backgroundColor: "white",
		borderRadius: 20,
		flexGrow: 1,
		justifyContent: "space-between",
		flexDirection: "row",
	},
});
