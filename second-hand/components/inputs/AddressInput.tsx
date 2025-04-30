import React, { useState } from "react";
import {
	View,
	TouchableOpacity,
	StyleSheet,
	Text,
	TouchableWithoutFeedback,
	Modal,
	Button
} from "react-native";
import { Icon } from '@rneui/themed';
import globalStyles from "@assets/css/globalStyles";
import MapScreen from "@components/custom/MapScreen";

export default function AddressInput({
	value,
	onPress,
	infoMessage,
}: {
	value: {
		latitude: string,
		longitude: string
	};
	infoMessage: string;
	onPress: (value: { latitude: string, longitude: string }) => void;
}) {
	const [showInfo, setShowInfo] = useState(false);
	const [isMapVisible, setIsMapVisible] = useState(false);

	const handleInfoPress = () => {
		setShowInfo(!showInfo);
	};

	const handleOutsidePress = () => {
		setShowInfo(false);
	};

	const openMap = () => {
		setIsMapVisible(true);
	}

	const saveAddress = (address: {
		latitude: string, longitude: string
	}) => {
		onPress(address);
	}

	return (
		<View style={styles.container}>
			<TouchableOpacity style={[globalStyles.secondary_button, styles.button, globalStyles.shadow]} onPress={openMap}>
				<Text style={globalStyles.text_white}>Одбери адреса</Text>
			</TouchableOpacity>
			<TouchableOpacity style={styles.infoIcon} onPress={handleInfoPress}>
				<Icon name="info-circle" size={20} color="white" type="font-awesome" />
			</TouchableOpacity>
			<Modal visible={showInfo} transparent animationType={"fade"}>
				<TouchableWithoutFeedback onPress={handleOutsidePress}>
					<View style={[styles.overlay, styles.modalBackground]}>
						<View style={styles.infoTooltip}>
							<Text>{infoMessage}</Text>
						</View>
					</View>
				</TouchableWithoutFeedback>
			</Modal>
			<Modal
				visible={isMapVisible}>
				<MapScreen style={{ height: '100%', width: '100%' }} saveAddress={saveAddress} closeMap={() => setIsMapVisible(false)} />
			</Modal>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: 'center',
		alignSelf: 'center',
		width: 245
	},
	button: {
		width: 200,
		paddingVertical: 10,
		marginVertical: 15
	},
	input: {
		fontSize: 18,
		color: "#7891D3",
	},
	infoIcon: {
		padding: 5,
	},
	infoTooltipContainer: {
		position: "absolute",
		zIndex: 1,
		top: "100%",
		left: 0,
	},
	overlay: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	infoTooltip: {
		width: 250,
		backgroundColor: "white",
		padding: 10,
		borderRadius: 8,
		borderWidth: 1,
		borderColor: "gray",
	},
	modalBackground: {
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
	}
});
