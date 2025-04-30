import {
	Alert,
	ImageBackground,
	KeyboardAvoidingView, Modal,
	Platform,
	ScrollView,
	StyleSheet,
	TextInput,
} from "react-native";

import * as ImagePicker from "expo-image-picker";
import { Text, View } from "react-native";
import globalStyles from "@assets/css/globalStyles";
import { useEffect, useState } from "react";
import SecondaryButton from "@components/buttons/SecondaryButton";
import ImageInput from "@components/inputs/ImageInput";
import BackButton from "@components/buttons/BackButton";
import { useRouter, useLocalSearchParams } from "expo-router";
import { IProduct } from "@interfaces/types";
import Products from "@/constants/Products";
import { Picker } from "@react-native-picker/picker";
import ColorPicker from "react-native-wheel-color-picker";
import { useAuth } from "@/services/context/AuthContext";
import PhotoSourceModal from "@/components/custom/PhotoSourceModal";
import CameraScreen from "@screens/camera";
import { compressAndConvertToBase64 } from "@/utils/CompressImage";
import userService from "@services/userService";
import productService from "@services/productService";

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
	const [product, setProduct] = useState<IProduct>({ ...initialState });
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [isCameraVisible, setIsCameraVisible] = useState(false);
	const router = useRouter();
	const { user } = useAuth();
	const params = useLocalSearchParams();

	const changeHandler = (name: string, value: string) => {
		setProduct((prev) => ({ ...prev, [name]: value }));
	};

	// Functions to handle input changes
	const handleImagePress = async () => {
		setIsModalVisible(true);
	};

	const handleCapture = async (imgUri: string) => {
		try {
			changeHandler("image", imgUri);
		} catch (error) {
			console.error("Error uploading captured image:", error);
		}
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
				const pickedUri = pickerResult.assets[0].uri;
				const compressedBase64 = await compressAndConvertToBase64(pickedUri);
				changeHandler("image", compressedBase64);
			}

			setIsModalVisible(false);
		}

		else if (selectedSource === 'cancel') {
			setIsModalVisible(false);
		}
	};

	const handleSubmit = async () => {
		if (!user) {
			Alert.alert("Грешка", "Корисникот не е најавен");
			return;
		}

		if (!product.image) {
			Alert.alert("Некомплетен производ", "Ве молиме изберете слика!");
			return;
		}

		if (!product.brand) {
			Alert.alert("Некомплетен производ", "Ве молиме внесете бренд!");
			return;
		}

		if (!product.price) {
			Alert.alert("Некомплетен производ", "Ве молиме внесете цена!");
			return;
		}

		try {
			await productService.addNewProduct(product, user.uid);

			router.replace({
				pathname: "/screens/list-of-products",
				params: {
					category: product.category,
					navigatedFromCreatedProduct: "true"
				}
			})
		} catch (error: any) {
			alert(error.message);
		}
	};

	useEffect(() => {
		if (params.product) {
			const existingProduct = JSON.parse(params.product as string) as IProduct;
			setProduct(existingProduct);
		}
	}, [params.product]);

	useEffect(() => {
		if (!user) return;

		const effect = async () => {
			const address = await userService.fetchUserAddress(user.uid);
			if (address) {
				setProduct((prev) => ({
					...prev,
					address: address,
				}));
			}
		}

		effect();
	}, [user, params.product]);

	return (
		<KeyboardAvoidingView
			style={[globalStyles.background_transparent, styles.width]}
			behavior={Platform.OS === "ios" ? "padding" : "height"}>
			<ImageBackground source={require("@assets/images/background.png")} style={globalStyles.background}>
				<ScrollView contentContainerStyle={globalStyles.scroll_view}>
					<BackButton title={"Назад"} />
					<PhotoSourceModal isVisible={isModalVisible} handleChoice={handleModalSelection} />
					<View style={globalStyles.container}>
						<Text style={globalStyles.title}>{product.id ? "Измени производ" : "Додади производ"}</Text>

						<ImageInput onPress={handleImagePress} imageUri={product.image} />

						<Text style={styles.title}>Категорија</Text>
						<Picker
							selectedValue={product.category}
							style={globalStyles.picker}
							onValueChange={changeHandler.bind(null, "category")}>
							{Products.categories.map((category) => (
								<Picker.Item key={category} label={category} value={category} />
							))}
						</Picker>

						<Text style={styles.title}>Големина</Text>
						<Picker
							selectedValue={product.size}
							style={globalStyles.picker}
							onValueChange={changeHandler.bind(null, "size")}>
							{Products.sizes.map((size) => (
								<Picker.Item key={size} label={size} value={size} />
							))}
						</Picker>

						<TextInput
							style={globalStyles.input_field}
							placeholder="Бренд"
							value={product.brand}
							onChangeText={changeHandler.bind(null, "brand")}
						/>

						{product.color &&
							<View style={styles.colorContainer}>
								<ColorPicker
									color={product.color}
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
							<View style={{ height: 20, backgroundColor: product.color, width: 50 }} />
						</View>

						<TextInput
							style={globalStyles.input_field}
							placeholder="Цена"
							value={product.price}
							keyboardType="numeric"
							onChangeText={changeHandler.bind(null, "price")}
						/>
						<SecondaryButton title={product.id ? "Измени" : "Додади"} onPress={handleSubmit} />

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
