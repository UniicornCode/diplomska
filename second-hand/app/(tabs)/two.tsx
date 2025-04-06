import { StyleSheet } from "react-native";

import { Text, View } from "@components/Themed";
import CreateEditProduct from "@screens/create-edit-product";
import { useAuth } from "@services/context/AuthContext";
import { useFocusEffect, useNavigation } from "expo-router";

export default function TabTwoScreen() {
	const navigator = useNavigation();
	const { user } = useAuth();

	useFocusEffect(() => {
		if (!user) {
			navigator.navigate("screens/login" as never);
		}
	});
	if (!user) {
		return <></>;
	}
	return (
		<View style={styles.container}>
			<CreateEditProduct />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	title: {
		fontSize: 20,
		fontWeight: "bold",
	},
	separator: {
		marginVertical: 30,
		height: 1,
		width: "80%",
	},
});
