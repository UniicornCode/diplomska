import { View, Text, StyleSheet, TextInput, ScrollView, ImageBackground, Alert, KeyboardAvoidingView, Platform } from "react-native";
import globalStyles from "@assets/css/globalStyles";
import BackButton from "@components/buttons/BackButton";
import StarRating from "@components/custom/StarRating";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { useAuth } from "@/services/context/AuthContext";
import { INewRating, IUser } from "@/interfaces/types";
import SecondaryButton from "@/components/buttons/SecondaryButton";
import ratingService from "@/services/ratingService";

export default function RatingFormScreen() {
	const { seller: sellerString } = useLocalSearchParams();
	const seller: IUser = sellerString ? JSON.parse(sellerString as string) : {};
	const { user, userData } = useAuth();
	const router = useRouter();
	const [rating, setRating] = useState(0);
	const [comment, setComment] = useState("");

	const handleSubmit = async () => {
		// Check if there is user logged in
		if (!user) {
			Alert.alert("Грешка", "Нема најавен корисник.")
			return;
		}

		// Check if both rating and comment are filled out
		if (!rating || !comment.trim()) {
			Alert.alert("Грешка", "Ве молиме одберете оценка и пополнете го описот.");
			return;
		}

		const ratingData: INewRating = {
			userId: user.uid,
			userName: userData?.name + " " + userData?.surname,
			sellerId: seller.userId,
			sellerName: seller.name,
			rating,
			comment,
		};

		try {
			await ratingService.addRating(ratingData);
			Alert.alert("Успешно", "Вашата оценка е зачувана.");
			router.back();
		} catch (error) {
			Alert.alert("Грешка", "Неуспешно зачувување на оценка.");
		}
	};

	return (
		<View style={globalStyles.background_transparent}>
			<ImageBackground source={require("@assets/images/background.png")} style={globalStyles.background} >
				<ScrollView>
					<BackButton title="Назад" />
					<View style={globalStyles.container}>
						<View style={globalStyles.white_container}>
							<Text style={styles.title}>Остави оценка за</Text>
							<Text style={styles.seller_name}>{seller.name}</Text>
							<StarRating rating={rating} setRating={setRating} isDisabled={false} />
							<TextInput
								style={styles.text_input}
								multiline
								placeholder="Напиши опис за оценката..."
								value={comment}
								onChangeText={setComment}
							/>
							<SecondaryButton title="Зачувај" onPress={handleSubmit} />
						</View>
					</View>
				</ScrollView>
			</ImageBackground>
		</View>
	);
}

const styles = StyleSheet.create({
	title: {
		fontSize: 20,
		fontWeight: "bold",
		marginVertical: 15,
		textAlign: "center",
		letterSpacing: 2
	},
	text_input: {
		width: "80%",
		borderWidth: 1,
		borderColor: "#ccc",
		borderRadius: 10,
		padding: 10,
		marginVertical: 20,
		height: 100,
		textAlignVertical: "top"
	},
	seller_name: {
		letterSpacing: 3,
		fontSize: 20,
		paddingBottom: 15
	},
});
