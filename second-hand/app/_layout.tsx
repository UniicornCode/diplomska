import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { AuthProvider } from '@services/context/AuthContext';
import Navbar from '@/components/global/Navbar';

export {
	// Catch any errors thrown by the Layout component.
	ErrorBoundary,
} from 'expo-router';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
	const [loaded, error] = useFonts({
		SpaceMono: require('@assets/fonts/SpaceMono-Regular.ttf'),
		...FontAwesome.font,
	});

	// Expo Router uses Error Boundaries to catch errors in the navigation tree.
	useEffect(() => {
		if (error) throw error;
	}, [error]);

	useEffect(() => {
		if (loaded) {
			SplashScreen.hideAsync();
		}
	}, [loaded]);

	if (!loaded) {
		return null;
	}

	return <RootLayoutNav />;
}

function RootLayoutNav() {
	return (
		<AuthProvider>
			<Stack screenOptions={{ header: () => <Navbar /> }}>
				<Stack.Screen name="(tabs)" />
				<Stack.Screen name="screens/login" options={{ headerShown: false }} />
				<Stack.Screen name="screens/register" options={{ headerShown: false }} />
				<Stack.Screen name="screens/user-profile" />
				<Stack.Screen name="screens/user-list-of-products" />
				<Stack.Screen name="screens/categories" />
				<Stack.Screen name="screens/list-of-products" />
				<Stack.Screen name="screens/product" />
				<Stack.Screen name="screens/camera" />
				<Stack.Screen name="screens/seller" />
				<Stack.Screen name="screens/list-of-ratings" />
				<Stack.Screen name="screens/rating-form" />
			</Stack>
		</AuthProvider>
	);
}
