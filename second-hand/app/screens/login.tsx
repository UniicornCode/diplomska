import {
	Image,
	ImageBackground,
	KeyboardAvoidingView,
	Platform,
	ScrollView,
	StyleSheet,
	TextInput,
} from "react-native";

import { Text, View } from "../../components/Themed";
import globalStyles from "../../assets/css/globalStyles";
import { useState } from "react";
import SecondaryButton from "../../components/buttons/SecondaryButton";
import { useNavigation } from "expo-router";
import BackButton from "../../components/buttons/BackButton";
import { ILogin } from "../interfaces/types";
import { useAuth } from "../services/context/AuthContext";

const initialState = { email: "", password: "" };

export default function LoginScreen() {
	const [data, setData] = useState<ILogin>({ ...initialState });
	const { signIn } = useAuth();
	const navigation = useNavigation();

	// Function to handle input changes
	const changeHandler = (name: string, value: string) => {
		setData((prev) => ({ ...prev, [name]: value }));
	};

	// Function to handle form submission
	const handleLogin = async () => {
		try {
			await signIn(data);
			navigation.navigate("(tabs)" as never)
		} catch (error: any) {
			// Check if the error is an instance of AuthError
			if (error.code === "auth/wrong-password" || error.code === "auth/user-not-found") {
				alert("Wrong credentials or user does not exist.");
			} else {
				alert("An error occurred. Please try again.");
			}
		}
	};

	const handleBack = () => {
		navigation.reset({
			index: 0, // The index of the active screen (in this case, the tabs screen)
			routes: [{ name: "(tabs)" }], // Reset to the tabs screen
		});
	};

	return (
		<KeyboardAvoidingView
			style={globalStyles.background_transparent}
			behavior={Platform.OS === "ios" ? "padding" : "height"}>
			<ImageBackground source={require("../../assets/images/background.png")} style={globalStyles.background}>
				<ScrollView contentContainerStyle={globalStyles.scroll_view}>
					<BackButton title={"Назад"} source={require("../../assets/images/back-icon.png")} goBack={handleBack} />
					<View style={globalStyles.container}>
						<Image source={require("../../assets/images/simple-logo.png")} style={globalStyles.simple_logo} />
						<Text style={globalStyles.title}>Најави се</Text>

						<TextInput
							style={globalStyles.input_field}
							keyboardType="email-address"
							placeholder="Емаил"
							value={data.email}
							onChangeText={changeHandler.bind(null, "email")}
						/>

						<TextInput
							style={globalStyles.input_field}
							placeholder="Лозинка"
							secureTextEntry={true}
							value={data.password}
							onChangeText={changeHandler.bind(null, "password")}
						/>

						<SecondaryButton title="Најави се" onPress={handleLogin} />
					</View>
				</ScrollView>
			</ImageBackground>
		</KeyboardAvoidingView>
	);
}

const styles = StyleSheet.create({});
