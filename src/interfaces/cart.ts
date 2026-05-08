import { ValidSizes } from "./product";

export interface CartItem {
    id: string;
    image: string;
    title: string;
    price: number;
    quantity: number;
    size: ValidSizes;
    stock: number;
    slug: string;
}

export interface OperationResult {
    type?: "add" | "edit" | "delete";
    status: "success" | "error";
    message: string;
}

interface OrderSummaryResult {
    subtotal: number;
    shipping: number;
    tax: number;
    total: number;
    totalItems: number;
}

export interface CartStore {
    // state
    items: CartItem[];
    operationResult: OperationResult | null;
    itemAddedRecently: CartItem | null;

    //actions items
    addItem: (item: CartItem) => void;
    replaceQuantity: (id: string, size: ValidSizes, quantity: number) => void;
    removeItem: (id: string, size: ValidSizes) => void;
    clearCart: () => void;
    getOrderSummary: () => OrderSummaryResult;


    // actions operation result
    addOperationResult: (result: OperationResult) => void;
    clearOperationResult: () => void;
    clearItemAddedRecently: () => void;
}
