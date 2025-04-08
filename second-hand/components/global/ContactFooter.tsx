import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import globalStyles from "@assets/css/globalStyles";
import { useNavigation, useRouter } from "expo-router";
import { IRegister } from "@interfaces/types";

export default function ContactFooter(seller: IRegister) {
	const router = useRouter();

	const handleSeller = () => {
		router.push({
			pathname: "/screens/seller",
			params: { seller: JSON.stringify(seller) }
		})
	};

	return (
		<TouchableOpacity style={[styles.container, globalStyles.background_blue]} onPress={handleSeller}>
			<Text style={styles.text}>Контактирај продавач: {seller.name}</Text>
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
