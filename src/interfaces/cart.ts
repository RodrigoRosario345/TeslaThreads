interface CartItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
}

export interface CartStore{
    // state
    items: CartItem[];


    //actions
    addItem: (item: CartItem) => void;
    removeItem: (id: string) => void;
    clearCart: () => void;
}