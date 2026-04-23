import { ValidSizes } from "./product";

export interface CartItem {
    id: string;
    image: string;
    title: string;
    price: number;
    quantity: number;
    size: ValidSizes;
    stock: number;
}

export interface CartStore{
    // state
    items: CartItem[];


    //actions
    addItem: (item: CartItem) => void;
    replaceQuantity: (id: string, size: ValidSizes, quantity: number) => void;
    removeItem: (id: string, size: ValidSizes) => void;
    clearCart: () => void;
}