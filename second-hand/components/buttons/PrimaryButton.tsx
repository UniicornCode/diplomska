import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import globalStyles from "@assets/css/globalStyles";
import { useNavigation } from "expo-router";

interface IProps {
	title: string;
	name: string;
}

export default function PrimaryButton({ title, name }: IProps) {
	const navigation = useNavigation();

	const handleNavigation = (name: string) => {
		navigation.navigate(name as never);
	};
	return (
		<TouchableOpacity
			style={[globalStyles.primary_button, globalStyles.shadow]}
			onPress={() => {
				handleNavigation(name);
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
