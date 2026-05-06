import { DeliveryAddress, DeliveryAddressStore } from "@/interfaces";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

const emptyDeliveryAddress: DeliveryAddress = {
    firstName: "",
    lastName: "",
    addressLine1: "",
    postalCode: "",
    city: "",
    country: "",
    phoneNumber: "",
};

export const useDeliveryAddressStore = create<DeliveryAddressStore>()(
    devtools(
        persist(
            (set) => ({
                deliveryAddress: emptyDeliveryAddress,

                addDeliveryAddress: (address) => set({ deliveryAddress: address }),
                clearDeliveryAddress: () => set({ deliveryAddress: emptyDeliveryAddress }),
            }),
            {
                name: "delivery-address",
            },
        ),
    ),
);
