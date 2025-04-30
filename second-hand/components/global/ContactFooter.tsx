import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import globalStyles from "@assets/css/globalStyles";
import { useRouter } from "expo-router";
import { IUser } from "@interfaces/types";

interface IProps {
	seller: IUser
}

export default function ContactFooter({ seller }: IProps) {
	const router = useRouter();

	const handleSeller = () => {
		router.push({
			pathname: "/screens/seller",
			params: {
				seller: JSON.stringify(seller)
			}
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
		height: 80,
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
