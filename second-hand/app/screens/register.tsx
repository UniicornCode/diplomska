import {
	Image,
	ImageBackground,
	KeyboardAvoidingView, Modal,
	Platform,
	ScrollView,
	StyleSheet,
	TextInput,
} from "react-native";

import * as ImagePicker from "expo-image-picker";
import { Text, View } from "@components/Themed";
import globalStyles from "@assets/css/globalStyles";
import { useState } from "react";
import SecondaryButton from "@components/buttons/SecondaryButton";
import ImageInput from "@components/inputs/ImageInput";
import AddressInput from "@components/inputs/AddressInput";
import BackButton from "@components/buttons/BackButton";
import { useRouter } from "expo-router";
import { IRegister } from "@interfaces/types";
import { useAuth } from "@services/context/AuthContext";
import CameraScreen from "@screens/camera";
import PhotoSourceModal from "@/components/custom/PhotoSourceModal";

const initialState = {
	selectedImage: "",
	name: "",
	surname: "",
	email: "",
	address: {
		latitude: "",
		longitude: ""
	},
	phone: "",
	password: "",
};

export default function RegisterScreen() {
	const [data, setData] = useState<IRegister>({ ...initialState });
	const { signUp } = useAuth();
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [isCameraVisible, setIsCameraVisible] = useState(false);
	const router = useRouter();

	const changeHandler = (name: string, value: string) => {
		setData((prev) => ({ ...prev, [name]: value }));
	};

	const changeHandlerAddress = (address: { latitude: string; longitude: string }) => {
		setData((prev) => ({
			...prev,
			address: {
				...prev.address,
				...address
			},
		}));
	};

	// Functions to handle input changes
	const handleImagePress = async () => {
		setIsModalVisible(true);
	};

	const handleCapture = (imgUri: string) => {
		changeHandler("selectedImage", imgUri);
	}

	const handleLocation = (address: {
		latitude: string,
		longitude: string
	}) => {
		changeHandlerAddress({ latitude: address.latitude, longitude: address.longitude })
		alert("Успешно ја ажуриравте вашата локација");
	}

	const handleModalSelection = async (selectedSource: string) => {
		if (selectedSource === 'camera') {
			setIsModalVisible(false);
			setIsCameraVisible(true);
		}

		else if (selectedSource === 'gallery') {
			const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
			if (!permissionResult.granted) {
				alert("Permission to access camera roll is required!");
				return;
			}

			const pickerResult = await ImagePicker.launchImageLibraryAsync({
				mediaTypes: ImagePicker.MediaTypeOptions.Images,
				quality: 1,
			});

			if (!pickerResult.canceled) {
				const imageUri = pickerResult.assets[0].uri;
				changeHandler("selectedImage", imageUri);
			}

			setIsModalVisible(false);
		}

		else if (selectedSource === 'cancel') {
			setIsModalVisible(false);
		}
	};

	const handleRegister = async () => {
		if (!data.selectedImage) {
			alert("Ве молиме изберете слика!");
			return;
		}
		if (!data.name) {
			alert("Ве молиме внесете име!");
			return;
		}
		if (!data.surname) {
			alert("Ве молиме внесете презиме!");
			return;
		}
		if (!data.email) {
			alert("Ве молиме внесете емаил!");
			return;
		}
		if (!data.address) {
			alert("Ве молиме одберете адреса!");
			return;
		}
		if (!data.phone) {
			alert("Ве молиме внесете телефон!");
			return;
		}
		if (!data.password) {
			alert("Ве молиме внесете лозинка!");
			return;
		}
		try {
			await signUp(data);
			router.replace({
				pathname: "/screens/login"
			});
		} catch (error: any) {
			if (error.code === 'auth/email-already-in-use') {
				alert("Емаилот веќе се користи. Погледнете дали сте веќе регистрирани.");
			} else {
				const replacedMessage = error?.message?.replace(/^Firebase: | \(auth\/[^\)]+\)/g, "");
				alert(replacedMessage || "Грешка при регистрација!");
			}
		}
	};

	return (
		<KeyboardAvoidingView
			style={globalStyles.background_transparent}
			behavior={Platform.OS === "ios" ? "padding" : "height"}>
			<ImageBackground source={require("@assets/images/background.png")} style={globalStyles.background}>
				<ScrollView showsVerticalScrollIndicator={true}>
					<BackButton title={"Назад"} />
					<PhotoSourceModal isVisible={isModalVisible} handleChoice={handleModalSelection} />
					<View style={globalStyles.container}>
						<Image source={require("@assets/images/simple-logo.png")} style={globalStyles.simple_logo} />
						<Text style={globalStyles.title}>Регистрирај се</Text>

						<ImageInput onPress={handleImagePress} imageUri={data.selectedImage} />

						<TextInput
							style={globalStyles.input_field}
							placeholder="Име"
							value={data.name}
							onChangeText={changeHandler.bind(null, "name")}
						/>

						<TextInput
							style={globalStyles.input_field}
							placeholder="Презиме"
							value={data.surname}
							onChangeText={changeHandler.bind(null, "surname")}
						/>

						<TextInput
							style={globalStyles.input_field}
							keyboardType="email-address"
							placeholder="Емаил"
							value={data.email}
							onChangeText={changeHandler.bind(null, "email")}
						/>

						<AddressInput
							value={data.address}
							onPress={handleLocation}
							infoMessage={"Вашата адреса ќе биде видлива за регистрираните корисници на апликацијата!"}
						/>

						<TextInput
							style={globalStyles.input_field}
							keyboardType="phone-pad"
							placeholder="Телефон"
							value={data.phone}
							onChangeText={changeHandler.bind(null, "phone")}
						/>

						<TextInput
							style={globalStyles.input_field}
							placeholder="Лозинка"
							secureTextEntry={true}
							value={data.password}
							onChangeText={changeHandler.bind(null, "password")}
						/>

						<SecondaryButton title="Регистрирај се" onPress={handleRegister} />

						<Modal
							visible={isCameraVisible}
							onRequestClose={() => setIsCameraVisible(false)}>
							<CameraScreen style={styles.camera_style} onCapture={handleCapture} closeCamera={() => setIsCameraVisible(false)} />
						</Modal>
					</View>
				</ScrollView>
			</ImageBackground>
		</KeyboardAvoidingView>
	);
}

const styles = StyleSheet.create({
	camera_style: {
		height: '100%',
		width: '100%'
	}
});
