import {
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
import { useEffect, useState } from "react";
import SecondaryButton from "@components/buttons/SecondaryButton";
import ImageInput from "@components/inputs/ImageInput";
import BackButton from "@components/buttons/BackButton";
import { useRouter } from "expo-router";
import { IProduct, categories, sizes } from "@interfaces/types";
import { Picker } from "@react-native-picker/picker";
import ColorPicker from "react-native-wheel-color-picker";
import { useAuth } from "@services/context/AuthContext";
import { getFirestore, collection, addDoc, doc, getDoc } from "firebase/firestore";
import PhotoSourceModal from "@/components/custom/PhotoSourceModal";
import CameraScreen from "@screens/camera";

const initialState = {
	category: "Блузи",
	size: "XS",
	brand: "",
	color: "white",
	address: {
		latitude: "",
		longitude: ""
	},
	price: "",
	image: "",
};

export default function CreateEditProduct() {
	const [data, setData] = useState<IProduct>({ ...initialState });
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [isCameraVisible, setIsCameraVisible] = useState(false);
	const router = useRouter();
	const { user } = useAuth();

	useEffect(() => {
		const fetchUserAddress = async () => {
			if (!user) return;

			try {
				const db = getFirestore();
				const userDoc = await getDoc(doc(db, "users", user.uid));

				if (userDoc.exists()) {
					const userData = userDoc.data();
					if (userData.address) {
						setData((prev) => ({
							...prev,
							address: userData.address,
						}));
					}
				}
			} catch (error) {
				console.error("Error fetching user address:", error);
			}
		};

		fetchUserAddress();
	}, [user]);

	const changeHandler = (name: string, value: string) => {
		setData((prev) => ({ ...prev, [name]: value }));
	};

	// Functions to handle input changes
	const handleImagePress = async () => {
		setIsModalVisible(true);
	};

	const handleCapture = (imgUri: string) => {
		changeHandler("image", imgUri);
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
				changeHandler("image", imageUri);
			}

			setIsModalVisible(false);
		}

		else if (selectedSource === 'cancel') {
			setIsModalVisible(false);
		}
	};

	const handleAddNew = async () => {
		if (!data.image) {
			alert("Ве молиме изберете слика!");
			return;
		}

		if (!data.category) {
			alert("Ве молиме внесете категорија!");
			return;
		}

		if (!data.color) {
			alert("Ве молиме внесете боја!");
			return;
		}

		if (!data.price) {
			alert("Ве молиме внесете цена!");
			return;
		}

		if (!data.size) {
			alert("Ве молиме внесете големина!");
			return;
		}

		if (!user) {
			alert("User not logged in");
			return;
		}

		try {
			const db = getFirestore();
			const userDoc = await getDoc(doc(db, "users", user.uid));

			const newProduct = { ...data, userId: user.uid };

			// Reference the "products" collection and add the new document
			await addDoc(collection(db, "products"), newProduct);

			alert("Успешно додадовте производ");

			router.replace({
				pathname: "/screens/list-of-products",
				params: { category: newProduct.category }
			})
		} catch (error: any) {
			alert(error.message);
		}
	};

	return (
		<KeyboardAvoidingView
			style={[globalStyles.background_transparent, styles.width]}
			behavior={Platform.OS === "ios" ? "padding" : "height"}>
			<ImageBackground source={require("@assets/images/background.png")} style={globalStyles.background}>
				<ScrollView contentContainerStyle={globalStyles.scroll_view}>
					<BackButton title={"Назад"} />
					<PhotoSourceModal isVisible={isModalVisible} handleChoice={handleModalSelection} />
					<View style={globalStyles.container}>
						<Text style={globalStyles.title}>Додади производ</Text>

						<ImageInput onPress={handleImagePress} imageUri={data.image} />

						<Text style={styles.title}>Категорија</Text>
						<Picker
							selectedValue={data.category}
							style={globalStyles.picker}
							onValueChange={changeHandler.bind(null, "category")}>
							{categories.map((category) => (
								<Picker.Item key={category} label={category} value={category} />
							))}
						</Picker>

						<Text style={styles.title}>Големина</Text>
						<Picker
							selectedValue={data.size}
							style={globalStyles.picker}
							onValueChange={changeHandler.bind(null, "size")}>
							{sizes.map((size) => (
								<Picker.Item key={size} label={size} value={size} />
							))}
						</Picker>

						<TextInput
							style={globalStyles.input_field}
							placeholder="Бренд"
							value={data.brand}
							onChangeText={changeHandler.bind(null, "brand")}
						/>

						{data.color &&
							<View style={styles.colorContainer}>
								<ColorPicker
									color={data.color}
									onColorChange={(color) => changeHandler("color", color)}
									thumbSize={10}
									sliderSize={10}
									swatches={false}
									sliderHidden={true}
									noSnap={true}
									row={false}
								/>
							</View>}

						<View
							style={{
								flex: 1,
								backgroundColor: "transparent",
								justifyContent: "center",
								alignItems: "center",
								flexDirection: "row",
								marginVertical: 5
							}}>
							<Text>Боја: </Text>
							<View style={{ height: 20, backgroundColor: data.color, width: 50 }} />
						</View>

						<TextInput
							style={globalStyles.input_field}
							placeholder="Цена"
							value={data.price}
							keyboardType="numeric"
							onChangeText={changeHandler.bind(null, "price")}
						/>
						<SecondaryButton title="Додади" onPress={handleAddNew} />

						<Modal
							visible={isCameraVisible}
							onRequestClose={() => setIsCameraVisible(false)}>
							<CameraScreen style={{ height: '100%', width: '100%' }} onCapture={handleCapture} closeCamera={() => setIsCameraVisible(false)} />
						</Modal>
					</View>
				</ScrollView>
			</ImageBackground>
		</KeyboardAvoidingView>
	);
}

const styles = StyleSheet.create({
	width: {
		width: '100%'
	},
	colorContainer: {
		width: '100%',
		justifyContent: 'center',
		alignSelf: 'center',
		backgroundColor: 'transparent',
		marginVertical: 15
	},
	title: {
		paddingHorizontal: 30,
		paddingVertical: 5,
		color: 'white',
		fontSize: 20
	}
});
