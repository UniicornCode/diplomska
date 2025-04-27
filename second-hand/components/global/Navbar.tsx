import React from "react";
import { Image, StyleSheet, View, TouchableOpacity, StatusBar, SafeAreaView } from "react-native";
import globalStyles from "@assets/css/globalStyles";
import { useRouter } from "expo-router";
import { useAuth } from "@services/context/AuthContext";

export default function Navbar() {
	const router = useRouter();
	const { user, userData } = useAuth();

	const handleOpenProfile = () => {
		router.push({
			pathname: "/screens/user-profile"
		})
	};

	return (
		<SafeAreaView style={[styles.container, globalStyles.background_blue]}>
			<View style={[styles.navContainer, globalStyles.background_blue]}>
				<Image source={require("@assets/images/logo_white.png")} style={globalStyles.logo_style} />
				{user && (
					<TouchableOpacity onPress={handleOpenProfile}>
						<Image
							source={
								userData?.selectedImage ? { uri: userData.selectedImage } : require("@assets/images/user_photo.png")
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
	logo: {
		height: 40,
		width: 40,
		borderRadius: 50,
	},
});
