import { CartStore } from "@/interfaces";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCartStore = create<CartStore>()(
    persist(
        (set, get) => ({
            items: [],
            operationResult: null,
            itemAddedRecently: null,
            addItem: (item) =>
                set((state) => {
                    const existingItemIndex = state.items.findIndex(
                        (i) => i.id === item.id && i.size === item.size,
                    );

                    if (existingItemIndex !== -1) {
                        const updatedItems = [...state.items];
                        updatedItems[existingItemIndex].quantity += item.quantity;
                        return { items: updatedItems, itemAddedRecently: updatedItems[existingItemIndex] };
                    }

                    return { items: [...state.items, item], itemAddedRecently: item };
                }, false),
            replaceQuantity: (id, size, quantity) =>
                set((state) => {
                    const updatedItems = state.items.map((item) =>
                        item.id === id && item.size === size ? { ...item, quantity } : item,
                    );
                    return { items: updatedItems };
                }, false),
            removeItem: (id, size) =>
                set(
                    (state) => ({
                        items: state.items.filter(
                            (item) => !(item.id === id && item.size === size),
                        ),
                        operationResult: {
                            type: "delete",
                            status: "success",
                            message: "The item has been removed from your cart successfully.",
                        },
                    }),
                    false,
                ),
            clearCart: () => set({ items: [] }, false),
            getOrderSummary: () => {
                const { items } = get();
                const subtotal = items.reduce(
                    (total, item) => total + item.price * item.quantity,
                    0,
                );
                const shipping = items.length > 0 ? 5.99 : 0;
                const tax = subtotal * 0.15;
                const total = subtotal + shipping + tax;
                const totalItems = items.reduce((total, item) => total + item.quantity, 0);
                return { subtotal, shipping, tax, total, totalItems };
            },
            clearOperationResult: () => set({ operationResult: null }),
            clearItemAddedRecently: () => set({ itemAddedRecently: null }),
        }),
        { name: "cart" },
    ),
);
