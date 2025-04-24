import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Icon } from '@rneui/themed';
import { StarRatingProps } from '@/interfaces/types';

export default function StarRatingComponent({ rating, setRating, isDisabled }: StarRatingProps) {
	const handlePress = (index: number) => {
		if (!isDisabled && setRating) {
			setRating(index);
		}
	};

	return (
		<View style={styles.container}>
			{[1, 2, 3, 4, 5].map((index) => (
				<TouchableOpacity
					disabled={isDisabled}
					key={index}
					style={styles.star}
					onPress={() => handlePress(index)}
				>
					<Icon
						name={rating >= index ? 'star' : 'star-outline'}
						size={30}
						color={rating >= index ? 'gold' : 'gray'}
						type="materialicons"
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
