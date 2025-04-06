import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import globalStyles from "@assets/css/globalStyles";
import { useNavigation } from "expo-router";

interface IProps {
	title: string;
	source: any;
	goBack?: () => void;
}

export default function BackButton({ title, source, goBack }: IProps) {
	const navigation = useNavigation();

	return (
		<TouchableOpacity
			style={[globalStyles.back_button, globalStyles.shadow]}
			onPress={goBack ? goBack : () => navigation.goBack()}>
			<Image source={source} style={styles.backIcon} />
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
