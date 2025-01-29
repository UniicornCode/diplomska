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

export const categories = [
	"Блузи",
	"Панталони",
	"Сукњи",
	"Маици",
	"Капи",
	"Фустани",
	"Јакни",
	"Шорцеви",
	"Халки",
	"Шалови",
	"Чанти",
	"Чевли",
	"Чорапи",
	"Друго",
];

export const sizes = ["XS", "S", "M", "L", "XL", "XXL"];
