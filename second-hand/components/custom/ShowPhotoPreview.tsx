import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import globalStyles from "@assets/css/globalStyles";
import { useNavigation } from "expo-router";
import { Icon } from '@rneui/themed';
import React from "react";

export default function ShowPhotoPreview({ photo, takeNewPhoto, saveImage, closeCamera }: any) {

	const navigator = useNavigation();

	const processPhoto = () => {
		saveImage(photo.uri)
		closeCamera()
	}

	return (
		<View style={[globalStyles.background_transparent]}>
			<ImageBackground source={{ uri: photo && photo.uri }} style={styles.imageContainer}>
				<View style={[globalStyles.camera_button_container, globalStyles.background_blue]}>
					<TouchableOpacity onPress={closeCamera} style={styles.button}>
						<Icon name="close" size={40} color="white" type="font-awesome" />
					</TouchableOpacity>
					<TouchableOpacity onPress={takeNewPhoto} style={styles.button}>
						<Text style={[globalStyles.text_white, styles.text]}>Take new photo</Text>
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
