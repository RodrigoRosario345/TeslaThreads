import { DeliveryAddressStore } from "@/interfaces";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

export const useDeliveryAddressStore = create<DeliveryAddressStore>()(
    devtools(
        persist(
            (set) => ({
                deliveryAddress: null,

                addDeliveryAddress: (address) => set({ deliveryAddress: address }),
                clearDeliveryAddress: () => set({ deliveryAddress: null }),
            }),
            {
                name: "delivery-address",
            },
        ),
    ),
);
