import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import globalStyles from "@assets/css/globalStyles";
import { PhotoSourceModalProps } from '@/interfaces/types';

export default function PhotoSourceModal({ isVisible, handleChoice }: PhotoSourceModalProps) {

	return (
		<Modal visible={isVisible} transparent animationType="slide">
			<View style={styles.modalContainer}>
				<View style={styles.modalContent}>
					<TouchableOpacity onPress={() => handleChoice('camera')}>
						<Text style={styles.sourceOption}>Take Photo</Text>
					</TouchableOpacity>
					<TouchableOpacity onPress={() => handleChoice('gallery')}>
						<Text style={styles.sourceOption}>Choose from Gallery</Text>
					</TouchableOpacity>
					<TouchableOpacity onPress={() => handleChoice('cancel')}>
						<Text style={globalStyles.cancel_option}>Cancel</Text>
					</TouchableOpacity>
				</View>
			</View>
		</Modal>
	);
}

const styles = StyleSheet.create({
	modalContainer: {
		flex: 1,
		justifyContent: 'flex-end',
		alignItems: 'center',
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
	},
	modalContent: {
		backgroundColor: 'white',
		width: '100%',
		paddingVertical: 20,
		paddingHorizontal: 20,
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20,
	},
	sourceOption: {
		fontSize: 18,
		paddingVertical: 10,
		textAlign: 'center',
	}
});
