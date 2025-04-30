import { useAuth } from "@/services/context/AuthContext";
import { useRouter } from "expo-router";
import UserListOfProducts from "@screens/user-list-of-products";
import { useEffect } from "react";

export default function TabThreeScreen() {
	const router = useRouter();
	const { user } = useAuth();

	useEffect(() => {
		if (!user) {
			router.replace("/screens/login");
		}
	}, [user]);

	// Don't render the component if the user isn't logged in
	if (!user) {
		return null
	}

	return <UserListOfProducts />;
}
