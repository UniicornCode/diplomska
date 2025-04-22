export interface IRegister {
	selectedImage: string;
	name: string;
	surname: string;
	email: string;
	address: {
		latitude: string,
		longitude: string
	};
	phone: string;
	password: string;
}

export interface ILogin {
	email: string;
	password: string;
}

export interface IProduct {
	id?: string;
	category: string;
	size: string;
	brand: string;
	color: string;
	image: string;
	address: {
		latitude: string,
		longitude: string
	};
	userId?: string;
	seller?: IRegister;
	price: string;
}

export interface ShowPhotoPreviewProps {
	photo: { uri: string };
	retakePhoto: () => void;
	saveImage: (base64Uri: string) => void;
	closeCamera: () => void;
}

export interface CameraScreenProps {
	onCapture: (base64Uri: string) => void;
	closeCamera: () => void;
	style?: any;
}

export interface PhotoSourceModalProps {
	isVisible: boolean;
	handleChoice: (selectedSource: string) => void;
}

export const categories = [
	"Блузи",
	"Панталони",
	"Сукњи",
	"Маици",
	"Капи",
	"Фустани",
	"Јакни",
	"Шорцеви",
	"Шалови",
	"Чанти",
	"Чевли",
	"Друго",
];

export const sizes = ["XS", "S", "M", "L", "XL", "XXL"];

export type ValidRoutes =
	| "/"
	| "/(tabs)"
	| "/screens/categories"
	| "/screens/camera"
	| "/screens/create-edit-product"
	| "/screens/list-of-products"
	| "/screens/login"
	| "/screens/product/[id]"
	| "/screens/register"
	| "/screens/seller"
	| "/screens/user-list-of-products"
	| "/screens/user-profile";

export type CapturedImage = string | null;