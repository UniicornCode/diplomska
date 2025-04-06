import { Image, ImageBackground, ScrollView, StyleSheet, Text, View } from "react-native";
import globalStyles from "@assets/css/globalStyles";
import Navbar from "@components/global/Navbar";
import BackButton from "@components/buttons/BackButton";
import RatingFooter from "@components/global/RatingFooter";
import StarRating from "@components/custom/StarRating";
import SecondaryButton from "@components/buttons/SecondaryButton";
import { useNavigation } from "expo-router";
import { IRegister } from "@interfaces/types";
import { useAuth } from "@services/context/AuthContext";
import { useRoute } from "@react-navigation/native";

interface IType {
	user?: IRegister;
}
export default function Seller() {
	const navigator = useNavigation();
	const route = useRoute();
	const { user } = route.params;

	// TODO navigate to the list of a particular ID of a seller
	const showListOfRatings = () => {
		navigator.navigate("screens/list-of-ratings" as never);
	};

	// TODO open a rating form for a particular seller
	const openRatingForm = () => {
		navigator.navigate("screens/leave-rating" as never);
	};

	function haversineDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
		const R = 6371; // Earth's radius in kilometers

		// Convert degrees to radians
		const degToRad = (degree: number) => degree * (Math.PI / 180);

		// Convert latitudes and longitudes from degrees to radians
		lat1 = degToRad(lat1);
		lon1 = degToRad(lon1);
		lat2 = degToRad(lat2);
		lon2 = degToRad(lon2);

		// Calculate differences between latitudes and longitudes
		const dLat = lat2 - lat1;
		const dLon = lon2 - lon1;

		// Haversine formula
		const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
			Math.cos(lat1) * Math.cos(lat2) *
			Math.sin(dLon / 2) * Math.sin(dLon / 2);
		const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
		const distance = R * c;

		return distance; // Returns distance in kilometers
	}

	const { userData } = useAuth();

	return (
		<View style={globalStyles.background_transparent}>
			<Navbar />
			<ImageBackground source={require("../../assets/images/background.png")} style={globalStyles.background}>
				<ScrollView>
					<BackButton title={"Назад"} source={require("../../assets/images/back-icon.png")} />
					<View style={[globalStyles.container, globalStyles.shadow]}>
						<View style={globalStyles.white_container}>
							<Text style={styles.seller_name}>
								{user?.name || ""} {user?.surname || ""}
							</Text>
							<Image source={{ uri: user?.selectedImage }} style={[globalStyles.background_blue, styles.image_style]} />
							<View style={styles.owner_description}>
								<View>
									<Text style={styles.text}>Телефонски број</Text>
									<Text style={styles.text}>Е-маил</Text>
									<Text style={styles.text}>Оддалеченост</Text>
								</View>
								<View>
									<Text style={styles.text}>{user?.phone}</Text>
									<Text style={styles.text}>{user?.email}</Text>
									<Text style={styles.text}>{haversineDistance(
										+(user?.address?.latitude || 0),
										+(user?.address?.longitude || 0),
										+(userData?.address?.latitude || 0),
										+(userData?.address?.longitude || 0)
									)} km</Text>
								</View>
							</View>
							<Text>Рејтинг</Text>
							<StarRating rating={3} isDisabled={true} />
							{/* <SecondaryButton title={"Погледни рејтинзи"} onPress={showListOfRatings} /> */}
						</View>
					</View>
				</ScrollView>
				{/*<RatingFooter onPress={openRatingForm} />*/}
			</ImageBackground>
		</View>
	);
}

const styles = StyleSheet.create({
	seller_name: {
		letterSpacing: 3,
		marginTop: 20
	},
	owner_description: {
		paddingVertical: 20,
		width: 250,
		flexGrow: 1,
		justifyContent: "space-between",
		flexDirection: "row",
	},
	image_style: {
		marginVertical: 20,
		width: 100, // or another value
		height: 100, // or another value
	},
	text: {
		fontSize: 15,
		marginVertical: 5,
		maxWidth: 150,
	},
	custom_width: {
		maxWidth: 250,
	},
});
