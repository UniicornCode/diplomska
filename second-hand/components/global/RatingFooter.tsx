import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import globalStyles from "../../assets/css/globalStyles";

export default function RatingFooter({ onPress }: { onPress: () => void }) {

	return (
		<TouchableOpacity style={[styles.container, globalStyles.background_blue]} onPress={onPress}>
			<Text style={styles.text}>Остави рејтинг</Text>
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
