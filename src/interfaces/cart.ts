import { ValidSizes } from "./product";

export interface CartItem {
    id: string;
    image: string;
    title: string;
    price: number;
    quantity: number;
    size: ValidSizes;
}

export interface CartStore{
    // state
    items: CartItem[];


    //actions
    addItem: (item: CartItem) => void;
    removeItem: (id: string) => void;
    clearCart: () => void;
}