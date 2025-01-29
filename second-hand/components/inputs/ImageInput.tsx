import React, { SetStateAction } from "react";
import { View, Image, TouchableOpacity, StyleSheet } from "react-native";
interface IProps {
	onPress: () => Promise<void>;
	imageUri: string;
}

export default function ImageInput({ onPress, imageUri }: IProps) {
	const defaultImageUri = require("../../assets/images/user_photo.png");

	return (
		<TouchableOpacity onPress={onPress}>
			<View>
				<Image source={imageUri ? { uri: imageUri } : defaultImageUri} style={styles.imageStyle} />
			</View>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	imageStyle: {
		height: 95,
		width: 99,
		borderRadius: 100,
		marginBottom: 20,
		alignSelf: "center",
	},
});
