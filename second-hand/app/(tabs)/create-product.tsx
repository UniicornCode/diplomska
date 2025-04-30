import CreateEditProduct from "@screens/create-edit-product";
import { useAuth } from "@/services/context/AuthContext";
import { useRouter, useFocusEffect } from "expo-router";
import { useEffect } from "react";

export default function TabTwoScreen() {
	const router = useRouter();
	const { user } = useAuth();

	useEffect(() => {
		if (!user) {
			router.replace("/screens/login");
		}
	}, [user]);


	// Don't render the component if the user isn't logged in
	if (!user) {
		return null;
	}

	return <CreateEditProduct />;
}
