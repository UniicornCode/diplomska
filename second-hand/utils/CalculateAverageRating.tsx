export const calculateAverageRating = (ratings: any[]): number => {
	let totalRating = 0;
	let count = 0;

	ratings.forEach((rating) => {
		totalRating += rating.rating;
		count += 1;
	});

	return count > 0 ? totalRating / count : 0;
};
