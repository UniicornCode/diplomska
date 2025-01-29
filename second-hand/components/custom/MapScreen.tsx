// import React, { useState } from 'react';
// import { View, Text, StyleSheet, Dimensions, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';
// import MapView, { Marker } from 'react-native-maps';
// import globalStyles from "../../assets/css/globalStyles";
// import Icon from "react-native-vector-icons/FontAwesome";

// export default function MapScreen({ closeMap, saveAddress }: any) {
// 	const [selectedLocation, setSelectedLocation] = useState(
// 		{ latitude: 42, longitude: 21.4, });

// 	const handleMapPress = (event: any) => {
// 		const { latitude, longitude } = event.nativeEvent.coordinate;
// 		setSelectedLocation({ latitude, longitude });
// 	};

// 	const handleAddress = () => {
// 		saveAddress(selectedLocation)
// 		closeMap()
// 	}

// 	const removeAddress = () => {
// 		setSelectedLocation({ latitude: 0, longitude: 0 });
// 	}

// 	return (
// 		<SafeAreaView style={styles.container}>
// 			<View>
// 				<MapView
// 					style={styles.map}
// 					onPress={handleMapPress}
// 					initialRegion={{
// 						latitude: 42,
// 						longitude: 21.4,
// 						latitudeDelta: 0.0922,
// 						longitudeDelta: 0.0421,
// 					}}
// 				>
// 					{selectedLocation && (
// 						<Marker
// 							coordinate={{
// 								latitude: selectedLocation.latitude,
// 								longitude: selectedLocation.longitude,
// 							}}
// 						/>
// 					)}
// 				</MapView>
// 				<View style={[styles.button_container, globalStyles.background_blue]}>
// 					<TouchableOpacity onPress={closeMap} style={styles.button}>
// 						<Icon name={"close"} size={35} color={'white'} />
// 					</TouchableOpacity>
// 					<TouchableOpacity onPress={handleAddress} style={styles.button}>
// 						<Icon name={"save"} size={35} color={'white'} />
// 					</TouchableOpacity>
// 					<TouchableOpacity onPress={removeAddress} style={styles.button}>
// 						<Icon name={"trash"} size={35} color={'white'} />
// 					</TouchableOpacity>
// 				</View>
// 			</View>
// 		</SafeAreaView>
// 	);
// };

// const styles = StyleSheet.create({
// 	container: {
// 		flex: 1,
// 		alignItems: 'center',
// 		justifyContent: 'center',
// 		paddingTop: StatusBar.currentHeight,
// 	},
// 	map: {
// 		width: Dimensions.get('window').width,
// 		height: Dimensions.get('window').height,
// 	},
// 	button_container: {
// 		flexDirection: 'row',
// 		justifyContent: 'space-between',
// 		height: '22%'
// 	},
// 	button: {
// 		paddingVertical: 15,
// 		paddingHorizontal: 30
// 	}
// });
