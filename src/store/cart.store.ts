import { CartStore } from "@/interfaces";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

export const useCartStore = create<CartStore>()(
    devtools(
        (set) => ({
            items: [],
            addItem: (item) =>
                set((state) => ({ items: [...state.items, item] }), false, "addItem"),
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
