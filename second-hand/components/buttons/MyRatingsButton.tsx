import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import globalStyles from "@assets/css/globalStyles";
// @ts-ignore
import { Icon } from '@rneui/themed';
import Colors from "@/constants/Colors";

interface IProps {
	onPress: () => void;
}

export default function MyRatingsButton({ onPress }: IProps) {
	return (
		<TouchableOpacity style={[styles.button, globalStyles.shadow]} onPress={onPress}>
			<Text style={[globalStyles.text_blue, styles.text]}>Мои оценки</Text>
			<Icon name={"star"} size={20} color={Colors.primaryColor} type="font-awesome" />
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	button: {
		width: 200,
		height: 60,
		marginBottom: 20,
		paddingHorizontal: 20,
		alignSelf: "center",
		alignItems: "center",
		backgroundColor: "white",
		borderRadius: 20,
		flexGrow: 1,
		justifyContent: "space-between",
		flexDirection: "row",
	},
	text: {
		fontSize: 20,
	},
});
