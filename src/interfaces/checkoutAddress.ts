import z from "zod";

export const schemaCheckoutAddress = z.object({
    firstName: z
        .string("First name is required")
        .trim()
        .min(3, "First name must be at least 3 characters long")
        .regex(
            /^[a-zA-Z\s'-]+$/,
            "First name can only contain letters, spaces, apostrophes, and hyphens",
        ),
    lastName: z
        .string("Last name is required")
        .trim()
        .min(3, "Last name must be at least 3 characters long")
        .regex(
            /^[a-zA-Z\s'-]+$/,
            "Last name can only contain letters, spaces, apostrophes, and hyphens",
        ),
    addressLine1: z
        .string("Address Line 1 is required")
        .trim()
        .min(5, "Address Line 1 must be at least 5 characters long")
        .regex(
            /^[a-zA-Z0-9\s,'-]+$/,
            "Address Line 1 can only contain letters, numbers, spaces, commas, apostrophes, and hyphens",
        ),
    addressLine2: z.string().optional(),
    postalCode: z
        .string("Postal code is required")
        .trim()
        .min(4, "Postal code must be at least 4 characters long")
        .regex(
            /^[a-zA-Z0-9\s-]+$/,
            "Postal code can only contain letters, numbers, spaces, and hyphens",
        ),
    city: z
        .string("City is required")
        .trim()
        .min(2, "City must be at least 2 characters long")
        .regex(
            /^[a-zA-Z\s'-]+$/,
            "City can only contain letters, spaces, apostrophes, and hyphens",
        ),
    country: z
        .string("Country is required")
        .min(2, "Country must be at least 2 characters long")
        .regex(
            /^[a-zA-Z\s'-]+$/,
            "Country can only contain letters, spaces, apostrophes, and hyphens",
        ),
    phoneNumber: z
        .string("Phone number is required")
        .trim()
        .min(7, "Phone number must be at least 7 characters long")
        .regex(
            /^[0-9\s-]+$/,
            "Phone number can only contain numbers, spaces, and hyphens",
        ),
});

export type CheckoutAddressSchema = z.infer<typeof schemaCheckoutAddress>;
export type CheckoutAddressSchemaInput = z.input<typeof schemaCheckoutAddress>;
export type CheckoutAddressSchemaOutput = z.output<typeof schemaCheckoutAddress>;
