import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import { ValidRoutes } from '@interfaces/types';
import { useRoute } from '@react-navigation/native';
import PrimaryButton from '@/components/buttons/PrimaryButton';
import globalStyles from '@/assets/css/globalStyles';
import { useAuth } from '@services/context/AuthContext';
import Categories from '@screens/categories';

export default function IndexScreen() {
	const route = useRoute();
	const { screen } = (route.params || {}) as { screen?: ValidRoutes };
	const { user } = useAuth();

	if (user || screen === "/screens/categories") {
		return <Categories />;
	}

	return (
		<ImageBackground source={require("@assets/images/background.png")} style={globalStyles.background}>
			<View style={styles.container}>
				<PrimaryButton title={"Најави се"} screen={"/screens/login"} />
				<PrimaryButton title={"Регистрирај се"} screen={"/screens/register"} />
				<PrimaryButton title={"Разгледај"} screen={"/screens/categories"} />
				<View style={[styles.welcome_info, globalStyles.shadow]}>
					<Text style={[styles.welcome, globalStyles.text_white]}>Добредојде!</Text>
					<Text style={[styles.welcome, globalStyles.text_white]}>
						Особено ни е мило што се наоѓаш на нашата апликација за реискористување на облека од втора рака
					</Text>
				</View>
			</View>
		</ImageBackground>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "transparent",
	},
	welcome_info: {
		width: 250,
		marginVertical: 20,
		backgroundColor: "#7891D3",
		padding: 10,
		borderRadius: 10,
	},
	welcome: {
		textAlign: "center",
		flexWrap: "wrap",
		textAlignVertical: "top",
		fontSize: 16,
	},
});

