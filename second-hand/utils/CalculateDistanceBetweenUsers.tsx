export default function calculatDistanceBetweenUsers(lat1: number, lon1: number, lat2: number, lon2: number) {
	const R = 6371; // Earth's radius in kilometers

	// Convert degrees to radians
	const degToRad = (degree: number) => degree * (Math.PI / 180);

	// Convert latitudes and longitudes from degrees to radians
	lat1 = degToRad(lat1);
	lon1 = degToRad(lon1);
	lat2 = degToRad(lat2);
	lon2 = degToRad(lon2);

	// Calculate differences between latitudes and longitudes
	const dLat = lat2 - lat1;
	const dLon = lon2 - lon1;

	// Haversine formula
	const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
		Math.cos(lat1) * Math.cos(lat2) *
		Math.sin(dLon / 2) * Math.sin(dLon / 2);
	const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
	const distance = R * c;

	return distance; // Returns distance in kilometers
}