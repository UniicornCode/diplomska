import React, { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, StatusBar, SafeAreaView } from "react-native";
import { View } from "../Themed";
import globalStyles from "../../assets/css/globalStyles";
import { useNavigation } from "expo-router";
import { useAuth } from "../../app/services/context/AuthContext";

export default function Navbar() {
	const navigation = useNavigation();
	const { user, userData } = useAuth();
	const handleOpenProfile = () => {
		//TODO take information about user and navigate to profile page
		// setUserId(user?.uid);
		navigation.navigate("screens/user-profile" as never);
	};

	return (
		<SafeAreaView style={[styles.container, globalStyles.background_blue]}>
			<View style={[styles.navContainer, globalStyles.background_blue]}>
				<Image source={require("../../assets/images/logo_white.png")} style={styles.image} />
				{/*TODO When user is logged in, the user image should lead to his profile, when not, to login page*/}
				{user && (
					<TouchableOpacity onPress={handleOpenProfile}>
						<Image
							source={
								userData?.selectedImage ? { uri: userData.selectedImage } : require("../../assets/images/user_photo.png")
							}
							style={styles.logo}
						/>
					</TouchableOpacity>
				)}
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		borderBottomWidth: 1,
		borderColor: "gray",
	},
	navContainer: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		paddingHorizontal: 10,
		height: 60,
		paddingTop: StatusBar.currentHeight,
	},
	image: {
		width: 235,
		height: 50,
		marginVertical: 10,
	},
	logo: {
		height: 24,
		width: 28,
		borderRadius: 100,
	},
});
