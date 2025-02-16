import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import React, { useState, useRef } from 'react';
import { Button, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import ShowPhotoPreview from "../../components/custom/ShowPhotoPreview";
import { Icon } from '@rneui/themed';
import * as ImageManipulator from 'expo-image-manipulator';
import globalStyles from "../../assets/css/globalStyles";

export default function CameraScreen({ onCapture, closeCamera }: any) {
	const [facing, setFacing] = useState<CameraType>('back');
	const [permission, requestPermission] = useCameraPermissions();
	const cameraRef = useRef<CameraView>(null);
	const [previewVisible, setPreviewVisible] = useState(false)
	const [capturedImage, setCapturedImage] = useState<any>(null)

	if (!permission) {
		// Camera permissions are still loading
		return <View />;
	}


	if (!permission.granted) {
		// Camera permissions are not granted yet
		return (
			<View style={globalStyles.background_transparent}>
				<ImageBackground source={require("../../assets/images/background.png")} style={globalStyles.background}>
					<View style={styles.grand_permission_container}>
						<Text style={styles.text}>We need your permission to show the camera</Text>
						<Button onPress={requestPermission} title="Grant Permission" />
						<TouchableOpacity onPress={closeCamera}>
							<Text style={globalStyles.cancel_option}>Cancel</Text>
						</TouchableOpacity>
					</View>
				</ImageBackground>
			</View>
		);
	}

	function toggleCameraFacing() {
		setFacing(current => (current === 'back' ? 'front' : 'back'));
	}

	const takeNewPhoto = () => {
		setPreviewVisible(false)
		setCapturedImage(null)
	}

	const takePicture = async () => {
		if (!permission?.granted) {
			alert("Camera permission is required!");
			return;
		}

		if (!cameraRef.current) {
			console.error("Camera reference is not available.");
			return;
		}

		try {
			const photo = await cameraRef.current.takePictureAsync();

			if (!photo || !photo.uri) {
				console.error("Failed to capture photo.");
				return;
			}

			if (facing === 'front') {
				const flippedPhoto = await ImageManipulator.manipulateAsync(
					photo.uri,
					[{ flip: ImageManipulator.FlipType.Horizontal }]
				);

				setCapturedImage(flippedPhoto);
				setPreviewVisible(true);
			} else {
				setCapturedImage(photo);
				setPreviewVisible(true);
			}
		}
		catch (error) {
			console.error("Image manipulation failed:", error);
			alert("Error processing image.");
			return;
		}
	};


	return (
		<View style={styles.container}>
			{previewVisible && capturedImage ?
				(<ShowPhotoPreview photo={capturedImage} takeNewPhoto={takeNewPhoto} saveImage={onCapture} closeCamera={closeCamera} />) :
				(<CameraView
					style={styles.camera}
					facing={facing}
					ref={cameraRef}>
					<View style={[globalStyles.camera_button_container, globalStyles.background_blue]}>
						<TouchableOpacity style={[globalStyles.background_transparent, styles.button]} onPress={closeCamera}>
							<Icon name="close" size={40} color="white" type="font-awesome" />
						</TouchableOpacity>
						<TouchableOpacity style={[styles.takePicture, styles.button]} onPress={takePicture} />
						<TouchableOpacity style={[globalStyles.background_transparent, styles.endButton]} onPress={toggleCameraFacing}>
							<Icon name="retweet" size={40} color="white" type="font-awesome" />
						</TouchableOpacity>
					</View>
				</CameraView>)
			}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		width: '100%',
		height: '100%',
	},
	camera: {
		flex: 1,
	},
	button: {
		height: 60,
		justifyContent: 'center'
	},
	endButton: {
		alignItems: 'flex-end'
	},
	takePicture: {
		width: 60,
		height: 60,
		bottom: 0,
		borderRadius: 50,
		backgroundColor: '#fff'
	},
	grand_permission_container: {
		flex: 1,
		justifyContent: 'center'
	},
	text: {
		fontSize: 20,
		textAlign: 'center',
		alignSelf: 'center',
		width: '70%'
	}
});
