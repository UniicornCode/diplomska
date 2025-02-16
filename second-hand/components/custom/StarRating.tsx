import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
// @ts-ignore
import { Icon } from '@rneui/themed';

interface StarRatingProps {
	rating: number;
	isDisabled: boolean;
}

const StarRating: React.FC<StarRatingProps> = ({ rating, isDisabled }) => {
	const [selectedRating, setSelectedRating] = useState<number>(rating);

	const handleRate = (newRating: number) => {
		setSelectedRating(newRating);
	};

	return (
		<View style={styles.container}>
			{[1, 2, 3, 4, 5].map((index) => (
				<TouchableOpacity
					disabled={isDisabled}
					key={index}
					style={styles.star}
					onPress={() => handleRate(index)}
				>
					<Icon
						name={selectedRating >= index ? 'ios-star' : 'ios-star-outline'}
						size={30}
						color={selectedRating >= index ? 'gold' : 'gray'}
					/>
				</TouchableOpacity>
			))}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		marginTop: 10,
		marginBottom: 10
	},
	star: {
		padding: 5,
	},
});

export default StarRating;
