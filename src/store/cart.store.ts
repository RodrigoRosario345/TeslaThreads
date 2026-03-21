import { CartStore } from "@/interfaces";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

export const useCartStore = create<CartStore>()(
    devtools(
        (set) => ({
            items: [],
            addItem: (item) =>
                set(
                    (state) => {
                        const existingItemIndex = state.items.findIndex(
                            (i) => i.id === item.id,
                        );

                        if (existingItemIndex !== -1) {
                            const updatedItems = [...state.items];
                            updatedItems[existingItemIndex].quantity += item.quantity;
                            return { items: updatedItems };
                        }

                        return { items: [...state.items, item] };
                    },
                    false,
                    "addItem",
                ),
            replaceQuantity: (id, quantity) =>
                set(
                    (state) => {
                        const updatedItems = state.items.map((item) =>
                            item.id === id ? { ...item, quantity } : item,
                        );
                        return { items: updatedItems };
                    },
                    false,
                    "replaceQuantity",
                ),
            removeItem: (id) =>
                set(
                    (state) => ({ items: state.items.filter((item) => item.id !== id) }),
                    false,
                    "removeItem",
                ),
            clearCart: () => set({ items: [] }, false, "clearCart"),
        }),
        { name: "CartStore" },
    ),
);
