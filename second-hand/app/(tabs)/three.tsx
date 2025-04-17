import { useAuth } from "@services/context/AuthContext";
import { useFocusEffect, useRouter } from "expo-router";
import UserListOfProducts from "@screens/user-list-of-products";

export default function TabThreeScreen() {
	const router = useRouter();
	const { user } = useAuth();

	useFocusEffect(() => {
		if (!user) {
			router.replace({
				pathname: "/screens/login"
			})
		}
	});

	if (!user) {
		return null
	}

	return <UserListOfProducts />;
}