import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import globalStyles from "../../assets/css/globalStyles";
import { useNavigation } from "expo-router";
interface IProps {
	title: string;
	onPress: () => void;
}
export default function CategoryButton({ title, onPress }: IProps) {
	const navigation = useNavigation();

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
