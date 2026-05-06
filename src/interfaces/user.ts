import { Role } from "@/generated/prisma/enums";
import z from "zod";

export interface User {
    email: string;
    password: string;
    name: string;
    role: Role;
    emailVerified?: boolean;
    image?: string | null;
}

// Zod schema for user sign-in
export const userSignInSchema = z.object({
    email: z
        .string("The email field is required")
        .trim()
        .toLowerCase()
        .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email address"),
    password: z
        .string("The password field is required")
        .trim()
        .min(8, "Password must be at least 8 characters long"),
});

export type UserSignInSchema = z.infer<typeof userSignInSchema>;
export type userSignInSchemaInput = z.input<typeof userSignInSchema>;
export type userSignInSchemaOutput = z.output<typeof userSignInSchema>;

// Zod schema for user sign-up
export const userSignUpSchema = userSignInSchema.extend({
    name: z
        .string("The name field is required")
        .trim()
        .min(2, "Name must be at least 2 characters long"),
});

export type UserSignUpSchema = z.infer<typeof userSignUpSchema>;
export type userSignUpSchemaInput = z.input<typeof userSignUpSchema>;
export type userSignUpSchemaOutput = z.output<typeof userSignUpSchema>;