import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import globalStyles from "@assets/css/globalStyles";

interface IProps {
	title: string;
	onPress: () => void;
	backgroundColor?: string
}

export default function SecondaryButton({ title, onPress, backgroundColor }: IProps) {
	return (
		<TouchableOpacity style={[
			globalStyles.secondary_button,
			globalStyles.shadow,
			backgroundColor ? { backgroundColor: backgroundColor } : null]} onPress={onPress}>
			<Text style={[styles.buttonText, globalStyles.text_white]}>{title}</Text>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	buttonText: {
		textAlign: "center",
		fontSize: 18,
		fontWeight: "bold",
	}
});
