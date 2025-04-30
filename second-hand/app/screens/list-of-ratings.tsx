import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, ImageBackground, Alert } from "react-native";
import StarRating from "@components/custom/StarRating";
import { IRating, IUser } from "@/interfaces/types";
import { useLocalSearchParams } from "expo-router";
import BackButton from "@/components/buttons/BackButton";
import globalStyles from "@/assets/css/globalStyles";
import Colors from "@/constants/Colors";
import { useAuth } from "@/services/context/AuthContext";
import DeleteRatingsModal from "@/components/custom/DeleteRatingModal";
import { Icon } from "@rneui/themed";
import ratingService from "@/services/ratingService";

export default function RatingList() {
	const { seller: sellerString } = useLocalSearchParams();
	const seller: IUser | null = sellerString ? JSON.parse(sellerString as string) : {};
	const [ratings, setRatings] = useState<IRating[]>([]);
	const { user } = useAuth();
	const [isModalVisible, setModalVisible] = useState(false);
	const [ratingToDelete, setRatingToDelete] = useState<string | null>(null);

	// Check if seller exists before proceeding
	if (!seller)
		return;

	const handleDeleteRating = async (ratingId: string) => {
		try {
			await ratingService.deleteRating(ratingId);
			setRatings(prevRatings => prevRatings.filter((rating) => rating.id !== ratingId)); // Remove rating from state
			setModalVisible(false);
			Alert.alert("Успешно", "Оценката е успешно избришана.");
		} catch (error) {
			Alert.alert("Грешка", "Неуспешно бришење на оценка.");
		}
	};

	// Function to show the modal for confirmation
	const showDeleteModal = (ratingId: string) => {
		setRatingToDelete(ratingId);
		setModalVisible(true);
	};

	// Function to hide the modal
	const hideDeleteModal = () => {
		setModalVisible(false);
		setRatingToDelete(null);
	};

	useEffect(() => {
		const loadRatings = async () => {
			try {
				const results = await ratingService.fetchRatingsForSeller(seller.userId);
				setRatings(results);
			} catch (error) {
				console.error("Error recovering ratings: ", error);
				Alert.alert("Грешка", "Настана грешка при превземање на оценки.")
			}
		};

		loadRatings();
	}, [seller.userId]);

	return (
		<View style={globalStyles.background_transparent}>
			<ImageBackground source={require("@assets/images/background.png")} style={globalStyles.background}>
				<Text style={[globalStyles.wide_title, styles.title]}>Оценки за {seller.name}</Text>
				<BackButton title={"Назад"} />
				<FlatList
					contentContainerStyle={styles.containerFlatList}
					style={styles.container}
					data={ratings}
					keyExtractor={(item) => item.id}
					renderItem={({ item }) => (
						<View style={[globalStyles.shadow, styles.ratingsContainer]}>
							<View style={styles.card}>
								<Text style={styles.user_name}>Оценка од: {item.userName}</Text>
								<StarRating rating={item.rating} isDisabled={true} />
								<Text style={styles.description}>{item.comment}</Text>
								<Text style={styles.timestamp}>
									{new Date(item.createdAt?.toDate?.()).toLocaleDateString()}
								</Text>

								{user?.uid === item.userId && (
									<Icon name="delete"
										style={styles.deleteButton}
										type="materialicons"
										size={24}
										color={Colors.deleteColor}
										onPress={() => showDeleteModal(item.id)} />
								)}
							</View>
						</View>
					)}
				/>

				<DeleteRatingsModal
					visible={isModalVisible}
					onConfirm={() => {
						if (ratingToDelete) {
							handleDeleteRating(ratingToDelete); // Confirm deletion
						}
					}}
					onCancel={hideDeleteModal}
				/>
			</ImageBackground>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		marginTop: 20
	},
	containerFlatList: {
		paddingBottom: 30
	},
	ratingsContainer: {
		flex: 1,
		justifyContent: "flex-start",
		padding: 15,
		backgroundColor: Colors.primaryColor,
		marginVertical: 15,
		marginHorizontal: 35,
		borderRadius: 25,
	},
	title: {
		fontSize: 25,
		color: Colors.primaryColor,
		textAlign: "center",
	},
	card: {
		backgroundColor: "#fff",
		padding: 15,
		borderRadius: 10,
		elevation: 3,
	},
	description: {
		fontSize: 16,
		marginVertical: 10,
	},
	timestamp: {
		fontSize: 12,
		color: "gray",
		marginTop: 5,
		textAlign: "right",
	},
	deleteButton: {
		color: "red",
		marginTop: 10,
		textAlign: "right",
		alignSelf: "flex-end",
		fontSize: 16,
		fontWeight: "bold",
	},
	user_name: {
		fontSize: 17
	}
});
