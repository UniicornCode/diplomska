import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import globalStyles from "@assets/css/globalStyles";

interface IProps {
	title: string;
	onPress: () => void;
}

export default function CategoryButton({ title, onPress }: IProps) {
	return (
		<TouchableOpacity style={[globalStyles.category_button, globalStyles.shadow]} onPress={onPress}>
			<Text style={[globalStyles.text_blue, styles.title]}>{title}</Text>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	title: {
		fontSize: 22,
		fontWeight: "bold",
	},
});
