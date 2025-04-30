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

export interface IUser extends IRegister {
	userId: string;
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

export interface IRating {
	id: string;
	userId: string;
	userName: string;
	sellerId: string;
	sellerName: string;
	rating: number;
	comment: string;
	createdAt: any;
}

export type INewRating = Omit<IRating, "id" | "createdAt">;

export type ValidRoutes =
	| "/"
	| "/(tabs)"
	| "/screens/categories"
	| "/screens/camera"
	| "/screens/create-edit-product"
	| "/screens/product"
	| "/screens/list-of-products"
	| "/screens/login"
	| "/screens/register"
	| "/screens/seller"
	| "/screens/user-list-of-products"
	| "/screens/user-profile"
	| "/screens/list-of-ratings"
	| "/screens/rating-form";

export type CapturedImage = string | null;