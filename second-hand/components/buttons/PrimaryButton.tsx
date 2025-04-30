import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import globalStyles from "@assets/css/globalStyles";
import { useRouter } from "expo-router";
import { ValidRoutes } from "@/interfaces/types";

interface IProps {
	title: string;
	screen: ValidRoutes;
}

export default function PrimaryButton({ title, screen }: IProps) {
	const router = useRouter();

	const handleNavigation = () => {
		router.push(screen)
	};

	return (
		<TouchableOpacity
			style={[globalStyles.primary_button, globalStyles.shadow]}
			onPress={() => {
				handleNavigation();
			}}>
			<Text style={styles.buttonText}>{title}</Text>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	buttonText: {
		textAlign: "center",
		color: "white",
		fontSize: 20,
	},
});
