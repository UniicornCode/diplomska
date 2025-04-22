import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import globalStyles from "@assets/css/globalStyles";
import { Icon } from '@rneui/themed';
import React from "react";
import * as FileSystem from 'expo-file-system';
import { ShowPhotoPreviewProps } from "@/interfaces/types";
import { compressAndConvertToBase64 } from "@/utils/CompressImage";

export default function ShowPhotoPreview({ photo, retakePhoto, saveImage, closeCamera }: ShowPhotoPreviewProps) {
	const processPhoto = async () => {
		try {
			if (!photo?.uri) return;

			const compressedBase64 = await compressAndConvertToBase64(photo.uri);

			saveImage(compressedBase64);
			closeCamera();
		} catch (error) {
			console.error("Error processing photo:", error);
		}
	}

	return (
		<View style={[globalStyles.background_transparent]}>
			<ImageBackground source={{ uri: photo && photo.uri }} style={styles.imageContainer}>
				<View style={[globalStyles.camera_button_container, globalStyles.background_blue]}>
					<TouchableOpacity onPress={closeCamera} style={styles.button}>
						<Icon name="close" size={40} color="white" type="font-awesome" />
					</TouchableOpacity>
					<TouchableOpacity onPress={retakePhoto} style={styles.button}>
						<Text style={[globalStyles.text_white, styles.text]}>Retake photo</Text>
					</TouchableOpacity>
					<TouchableOpacity onPress={processPhoto} style={styles.button}>
						<Icon name="save" size={40} color="white" type="font-awesome" />
					</TouchableOpacity>
				</View>
			</ImageBackground>
		</View>
	)
}

const styles = StyleSheet.create({
	imageContainer: {
		flex: 1
	},
	button: {
		height: 60,
		justifyContent: "center"
	},
	text: {
		fontWeight: 'bold',
		fontSize: 20,
		textAlign: 'center'
	}
})
