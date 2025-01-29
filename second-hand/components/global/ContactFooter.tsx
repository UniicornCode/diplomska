import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import globalStyles from "../../assets/css/globalStyles";
import { useNavigation } from "expo-router";
import { IRegister } from "../../app/interfaces/types";

export default function ContactFooter(user: IRegister) {
	const navigation = useNavigation();

	const handleSeller = () => {
		//TODO open the page of the selected sellers cloth
		navigation.navigate({
			name: "pages/seller",
			params: { user: user },
		} as never);
	};

	return (
		<TouchableOpacity style={[styles.container, globalStyles.background_blue]} onPress={handleSeller}>
			<Text style={styles.text}>Контактирај продавач: {user.name}</Text>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	container: {
		height: 70,
		borderTopColor: "grey",
		borderTopWidth: 1,
	},
	text: {
		alignSelf: "center",
		marginVertical: 20,
		color: "white",
		fontSize: 20,
	},
});
