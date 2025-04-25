import { Image, ImageBackground, ScrollView, StyleSheet, Text, View } from "react-native";
import globalStyles from "@assets/css/globalStyles";
import BackButton from "@components/buttons/BackButton";
import RatingFooter from "@components/global/RatingFooter";
import StarRating from "@components/custom/StarRating";
import SecondaryButton from "@components/buttons/SecondaryButton";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useAuth } from "@services/context/AuthContext";
import { IUser } from "@interfaces/types";
import calculatDistanceBetweenUsers from "@/utils/CalculateDistanceBetweenUsers";
import { useEffect, useState } from "react";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "@app/firebase";
import { calculateAverageRating } from "@/utils/CalculateAverageRating";


export default function Seller() {
	const router = useRouter();
	const { seller: sellerString } = useLocalSearchParams();
	const seller: IUser = sellerString ? JSON.parse(sellerString as string) : {};
	const { userData, user } = useAuth();
	const [averageRating, setAverageRating] = useState<number>(0);

	const showListOfRatings = () => {
		router.push({
			pathname: "/screens/rating/list-of-ratings",
			params: { seller: JSON.stringify(seller) }
		})
	};

	useEffect(() => {
		if (!seller.userId) return;

		const q = query(
			collection(db, "ratings"),
			where("sellerId", "==", seller.userId)
		);

		const unsubscribe = onSnapshot(q, (snapshot) => {
			const ratings = snapshot.docs.map(doc => doc.data().rating);
			const avg = calculateAverageRating(ratings);
			setAverageRating(avg);
		});

		return () => unsubscribe();
	}, [seller.userId]);

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
									<Text style={styles.title} numberOfLines={2}>Телефонски број</Text>
									<Text style={styles.value} numberOfLines={2} ellipsizeMode="tail">{seller?.phone}</Text>
								</View>
								<View style={styles.row}>
									<Text style={styles.title} numberOfLines={2}>Е-маил</Text>
									<Text style={styles.value} numberOfLines={2} ellipsizeMode="tail">{seller?.email}</Text>
								</View>
								<View style={styles.row}>
									<Text style={styles.title} numberOfLines={2}>Оддалеченост</Text>
									<Text style={styles.value} numberOfLines={2} ellipsizeMode="tail">{calculatDistanceBetweenUsers(
										+(seller?.address?.latitude || 0),
										+(seller?.address?.longitude || 0),
										+(userData?.address?.latitude || 0),
										+(userData?.address?.longitude || 0)
									).toPrecision(3)} км</Text>
								</View>
							</View>
							<Text style={styles.rating}>Просечна оценка</Text>
							<StarRating rating={averageRating} isDisabled={true} />
							<SecondaryButton title={"Погледни оценки"} onPress={showListOfRatings} />
						</View>
					</View>
				</ScrollView>
				{user?.uid !== seller?.userId && <RatingFooter {...seller} />}
			</ImageBackground>
		</View>
	);
}

const styles = StyleSheet.create({
	seller_name: {
		letterSpacing: 3,
		fontSize: 20,
		marginTop: 20
	},
	owner_description: {
		paddingVertical: 20,
		width: 250,
		flexGrow: 1
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
	row: {
		flexDirection: "row",
		justifyContent: "space-between",
	},
	title: {
		fontSize: 17,
		fontWeight: 'bold',
		maxWidth: '50%',
		flex: 1,
		paddingVertical: 5
	},
	value: {
		fontSize: 17,
		maxWidth: '50%',
		flex: 2,
		paddingVertical: 5,
		paddingStart: 5
	},
	rating: {
		fontSize: 17,
		fontWeight: "bold",
		marginVertical: 5
	}
});
