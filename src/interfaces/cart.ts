import { ValidSizes } from "./product";

interface CartItem {
    id: string;
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