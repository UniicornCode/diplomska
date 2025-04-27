import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';

import Colors from '@/constants/Colors';

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
	name: React.ComponentProps<typeof FontAwesome>['name'];
	color: string;
}) {
	return <FontAwesome size={28} style={{ marginBottom: -15 }} {...props} />;
}

export default function TabLayout() {
	return (
		<Tabs
			screenOptions={{
				tabBarActiveTintColor: Colors.primaryColor,
				headerShown: false
			}}>
			<Tabs.Screen
				name="index"
				options={{
					title: "",
					tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />
				}}
			/>
			<Tabs.Screen
				name="create-product"
				options={{
					title: "",
					tabBarIcon: ({ color }) => <TabBarIcon name="plus" color={color} />
				}}
			/>
			<Tabs.Screen
				name="user-products"
				options={{
					title: "",
					tabBarIcon: ({ color }) => <TabBarIcon name="bars" color={color} />
				}}
			/>
		</Tabs>
	);
}
