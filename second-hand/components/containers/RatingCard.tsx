import { StyleSheet, Text, View } from "react-native";
import globalStyles from "@assets/css/globalStyles";
import StarRating from "@components/custom/StarRating";

export default function RatingCard() {
	return (
		<View style={[globalStyles.white_container, styles.content_style]}>
			<Text style={styles.text}>Опис од корисниците за услугата на продавачот во врска со производот кој го понудил и продал</Text>
			<StarRating rating={3} isDisabled={true} />
		</View>
	)
}

const styles = StyleSheet.create({
	content_style: {
		paddingVertical: 20,
		marginVertical: 10
	},
	text: {
		textAlign: 'justify',
		marginHorizontal: 20
	}
})
