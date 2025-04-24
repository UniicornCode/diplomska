import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import globalStyles from "@assets/css/globalStyles";
import { useRouter } from "expo-router";
import { IUser } from "@/interfaces/types";

export default function RatingFooter(seller: IUser) {
	const router = useRouter();

	const openRatingForm = () => {
		router.push({
			pathname: "/screens/rating/rating-form",
			params: {
				seller: JSON.stringify(seller)
			}
		})
	}

	return (
		<TouchableOpacity style={[styles.container, globalStyles.background_blue]} onPress={openRatingForm}>
			<Text style={styles.text}>Остави оценка</Text>
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	container: {
		height: 80,
		borderTopColor: 'grey',
		borderTopWidth: 1
	},
	text: {
		alignSelf: 'center',
		marginVertical: 20,
		color: 'white',
		fontSize: 20
	}
})
