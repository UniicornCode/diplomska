import React from "react";
import { Image, SafeAreaView, StatusBar, StyleSheet } from "react-native";
import { View } from "@components/Themed";
import globalStyles from "@assets/css/globalStyles";

export default function HeaderIcon({ source }: { source: any }) {
	return (
		<SafeAreaView style={globalStyles.background_white}>
			<View style={[styles.container]}>
				<Image source={source} style={styles.image} />
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		justifyContent: "center",
		alignItems: "center",
		borderBottomWidth: 1,
		borderColor: "gray",
	},
	image: {
		justifyContent: "center",
		width: 270,
		height: 55,
		marginVertical: 30,
		marginTop: StatusBar.currentHeight,
	},
});
