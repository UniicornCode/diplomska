import { Image, ImageBackground, ScrollView, StyleSheet, Text, View } from "react-native";
import globalStyles from "@assets/css/globalStyles";
import BackButton from "@components/buttons/BackButton";
import RatingFooter from "@components/global/RatingFooter";
import StarRating from "@components/custom/StarRating";
import SecondaryButton from "@components/buttons/SecondaryButton";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useAuth } from "@services/context/AuthContext";
import { IRegister } from "@/interfaces/types";

export default function Seller() {
	const router = useRouter();
	const { seller: sellerString } = useLocalSearchParams();
	const seller: IRegister = sellerString ? JSON.parse(sellerString as string) : {};

	// TODO navigate to the list of a particular ID of a seller
	const showListOfRatings = () => {
		router.push({
			pathname: "/(tabs)"
			// should be screens/list-of-ratings
		})
	};

	// TODO open a rating form for a particular seller
	const openRatingForm = () => {
		router.push({
			pathname: "/(tabs)"
			// should be screens/leave-rating
		})
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
			<ImageBackground source={require("@assets/images/background.png")} style={globalStyles.background}>
				<ScrollView>
					<BackButton title={"Назад"} />
					<View style={[globalStyles.container, globalStyles.shadow]}>
						<View style={globalStyles.white_container}>
							<Text style={styles.seller_name}>
								{seller?.name || ""} {seller?.surname || ""}
							</Text>
							<Image source={{ uri: seller?.selectedImage }} style={[globalStyles.background_blue, styles.image_style]} />
							<View style={styles.owner_description}>
								<View style={styles.row}>
									<Text style={styles.title} numberOfLines={1}>Телефонски број</Text>
									<Text style={styles.value} numberOfLines={2} ellipsizeMode="tail">{seller?.phone}</Text>
								</View>
								<View>
									<Text style={styles.text}>Телефонски број</Text>
									<Text style={styles.text}>Е-маил</Text>
									<Text style={styles.text}>Оддалеченост</Text>
								</View>
								<View>
									<Text style={styles.text}>{seller?.phone}</Text>
									<Text style={styles.text}>{seller?.email}</Text>
									<Text style={styles.text}>{haversineDistance(
										+(seller?.address?.latitude || 0),
										+(seller?.address?.longitude || 0),
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
		width: 100,
		height: 100,
	},
	text: {
		fontSize: 15,
		marginVertical: 5,
		maxWidth: 150,
	},
	custom_width: {
		maxWidth: 250,
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
});
