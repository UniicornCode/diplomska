import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, ImageBackground, Alert } from "react-native";
import { getFirestore, collection, query, where, getDocs, doc, deleteDoc } from "firebase/firestore";
import StarRating from "@components/custom/StarRating"; // use your existing star rating component
import { IRating, IUser } from "@/interfaces/types";
import { useLocalSearchParams } from "expo-router";
import BackButton from "@/components/buttons/BackButton";
import globalStyles from "@/assets/css/globalStyles";
import Colors from "@/constants/Colors";
import { useAuth } from "@/app/services/context/AuthContext";
import DeleteRatingsModal from "@/components/custom/DeleteRatingModal";
import { Icon } from "@rneui/themed";

export default function RatingList() {
	const { seller: sellerString } = useLocalSearchParams();
	const seller: IUser = sellerString ? JSON.parse(sellerString as string) : {};
	const [ratings, setRatings] = useState<IRating[]>([]);
	const { user } = useAuth();
	const [isModalVisible, setModalVisible] = useState(false); // Modal visibility state
	const [ratingToDelete, setRatingToDelete] = useState<string | null>(null); // Store the rating id to delete


	useEffect(() => {
		const fetchRatings = async () => {
			try {
				const db = getFirestore();
				const q = query(collection(db, "ratings"), where("sellerId", "==", seller.userId));
				const querySnapshot = await getDocs(q);
				const results: IRating[] = [];

				querySnapshot.forEach((doc) => {
					results.push({ id: doc.id, ...doc.data() } as IRating);
				});

				setRatings(results);
			} catch (error) {
				console.error("Грешка при превземање на оценки:", error);
			}
		};

		fetchRatings();
	}, [seller.userId]);

	const handleDeleteRating = async (ratingId: string) => {
		try {
			const db = getFirestore();
			const ratingRef = doc(db, "ratings", ratingId);
			await deleteDoc(ratingRef); // Deletes the rating from Firestore
			setRatings((prevRatings) => prevRatings.filter((rating) => rating.id !== ratingId)); // Removes the rating from the state
			setModalVisible(false); // Close the modal
			Alert.alert("Успешно", "Оценката е успешно избришана.");
		} catch (error) {
			console.error("Error deleting rating:", error);
			Alert.alert("Грешка", "Неуспешно бришење на оценка.");
		}
	};

	// Function to show the modal for confirmation
	const showDeleteModal = (ratingId: string) => {
		setRatingToDelete(ratingId);
		setModalVisible(true); // Show the modal
	};

	// Function to hide the modal
	const hideDeleteModal = () => {
		setModalVisible(false);
		setRatingToDelete(null); // Reset the rating to delete
	};

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
