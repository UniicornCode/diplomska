import {
	ImageBackground,
	ScrollView,
	StyleSheet,
	Text,
	View,
} from "react-native";
import globalStyles from "@assets/css/globalStyles";
import CategoryButton from "@components/buttons/CategoryButton";
import { useRouter } from "expo-router";
import BackButton from "@components/buttons/BackButton";
import Products from "@/constants/Products";
import { Dimensions } from "react-native";
import { useAuth } from "@/services/context/AuthContext";

export default function Categories() {
	const router = useRouter();
	const { user } = useAuth();

	const handleNavigation = (category: string) => {
		router.push({
			pathname: "/screens/list-of-products",
			params: { category }
		})
	};

	// Modify categories container height depending if the user is logged in or not
	const windowHeight = Dimensions.get("window").height;
	const desiredHeight = user ? windowHeight * 0.6 : windowHeight * 0.55;

	return (
		<View style={globalStyles.background_transparent}>
			<ImageBackground source={require("@assets/images/background.png")} style={globalStyles.background}>
				{/* Show back button when user is not logged in and is reviewing categories in order to be able to go back to the homepage */}
				{!user && <BackButton title={"Назад"} />}
				<View style={[globalStyles.container, globalStyles.shadow]}>
					<Text style={globalStyles.title}>Категории</Text>
					<ScrollView style={!user ? { height: desiredHeight } : null}>
						{Products.categories.map((category) => (
							<CategoryButton key={category} title={category} onPress={() => handleNavigation(category)} />
						))}
					</ScrollView>
				</View>
			</ImageBackground>
		</View>
	);
}
