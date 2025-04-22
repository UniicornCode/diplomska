import * as ImageManipulator from 'expo-image-manipulator';

export async function compressAndConvertToBase64(uri: string): Promise<string> {
	const result = await ImageManipulator.manipulateAsync(
		uri,
		[{ resize: { width: 700 } }], // Resize width (height adjusts automatically)
		{ compress: 0.3, format: ImageManipulator.SaveFormat.JPEG, base64: true } // 30% quality
	);
	return `data:image/jpeg;base64,${result.base64}`;
}
