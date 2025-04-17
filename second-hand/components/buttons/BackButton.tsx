import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import globalStyles from "@assets/css/globalStyles";
import { useRouter } from "expo-router";
import { ValidRoutes } from "@interfaces/types";

interface IProps {
	title: string;
	screen?: ValidRoutes;
}

export default function BackButton({ title, screen }: IProps) {
	const router = useRouter();

	const handleBack = () => {
		if (screen) {
			router.replace(screen);
		} else {
			router.back(); // fallback to a route if nothing to go back to
		}
	};

	return (
		<TouchableOpacity
			style={[globalStyles.back_button, globalStyles.shadow]}
			onPress={handleBack}>
			<Image source={require("@assets/images/back-icon.png")} style={styles.backIcon} />
			<Text style={[globalStyles.text_white, styles.title]}>{title}</Text>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	title: {
		fontSize: 16,
		fontWeight: "bold",
	},
	backIcon: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		height: 16,
		width: 24,
	},
});
