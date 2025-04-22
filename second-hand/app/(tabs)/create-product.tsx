import { StyleSheet } from "react-native";
import { View } from "@components/Themed";
import CreateEditProduct from "@screens/create-edit-product";
import { useAuth } from "@services/context/AuthContext";
import { useFocusEffect, useRouter } from "expo-router";

export default function TabTwoScreen() {
	const router = useRouter();
	const { user } = useAuth();

	useFocusEffect(() => {
		if (!user) {
			router.replace({
				pathname: "/screens/login"
			})
		}
	});

	if (!user) {
		return null;
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
	}
});
