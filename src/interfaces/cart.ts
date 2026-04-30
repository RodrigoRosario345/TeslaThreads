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

export interface OperationResult {
  type?: "add" | "edit" | "delete";
  status: "success" | "error";
  message: string;
}


export interface CartStore{
    // state
    items: CartItem[];
    operationResult: OperationResult | null;


    //actions
    addItem: (item: CartItem) => void;
    replaceQuantity: (id: string, size: ValidSizes, quantity: number) => void;
    removeItem: (id: string, size: ValidSizes) => void;
    clearCart: () => void;
    getOrderSummary: () => { subtotal: number; shipping: number, tax: number, total: number };
    clearOperationResult: () => void;
}