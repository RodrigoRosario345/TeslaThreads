import { ShippingAddress, ShippingAddressStore } from "@/interfaces";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

const emptyShippingAddress: ShippingAddress = {
    firstName: "",
    lastName: "",
    addressLine1: "",
    postalCode: "",
    city: "",
    country: "",
    phoneNumber: "",
};

export const useShippingAddressStore = create<ShippingAddressStore>()(
    devtools(
        persist(
            (set) => ({
                shippingAddress: emptyShippingAddress,
                addShippingAddress: (address) => set({ shippingAddress: address }),
                clearShippingAddress: () => set({ shippingAddress: emptyShippingAddress }),
            }),
            {
                name: "shipping-address",
            },
        ),
    ),
);
