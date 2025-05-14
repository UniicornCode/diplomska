import { Modal, View, Text, StyleSheet } from "react-native";
import SecondaryButton from "../buttons/SecondaryButton";
import Colors from "@/constants/Colors";

interface DeleteProductModalProps {
	visible: boolean;
	onConfirm: () => void;
	onCancel: () => void;
}

export default function DeleteProducteModal({ visible, onConfirm, onCancel }: DeleteProductModalProps) {
	return (
		<Modal
			visible={visible}
			transparent
			animationType="fade"
			onRequestClose={onCancel}
		>
			<View style={styles.modalOverlay}>
				<View style={styles.modalContent}>
					<Text style={styles.modalText}>
						Дали сте сигурни дека сакате да го избришете производот?
					</Text>

					<SecondaryButton
						title="Откажи"
						onPress={onCancel} />

					<SecondaryButton
						title="Потврди"
						onPress={onConfirm}
						backgroundColor={Colors.deleteColor}
					/>
				</View>
			</View>
		</Modal>
	);
}

const styles = StyleSheet.create({
	modalOverlay: {
		flex: 1,
		backgroundColor: "rgba(0,0,0,0.5)",
		justifyContent: "center",
		alignItems: "center",
	},
	modalContent: {
		width: "80%",
		backgroundColor: "white",
		padding: 20,
		borderRadius: 10,
		alignItems: "center",
	},
	modalText: {
		fontSize: 16,
		textAlign: "center",
		marginBottom: 20,
		color: "black",
	}
});