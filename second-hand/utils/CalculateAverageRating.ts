export function calculateAverageRating(ratings: any[]): number {
	const average = ratings.length
		? ratings.reduce((acc, curr) => acc + curr, 0) / ratings.length : 0;

	return average;
};
