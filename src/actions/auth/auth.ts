"use server";

import { AuthError } from "next-auth";
import { userSignInSchemaOutput, userSignUpSchemaOutput } from "@/interfaces/user";
import prisma from "@/lib/prisma";
import { hashSync } from "bcryptjs";
import { signIn, signOut } from "@/auth.config";

interface AuthResult {
    success: boolean;
    message: string;
}

export async function signInAction(formData: userSignInSchemaOutput): Promise<AuthResult> {
    try {
        await signIn("credentials", { ...formData, redirect: false });
        return { success: true, message: "Signed in successfully." };
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return { success: false, message: "Invalid email or password." };
                default:
                    return { success: false, message: "Something went wrong." };
            }
        }
        throw error;
    }
}

export async function signOutAction() {
    await signOut({ redirect: false });
}

export async function signUpAction(formData: userSignUpSchemaOutput): Promise<AuthResult> {
    try {
        const { name, email, password } = formData;

        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            return { success: false, message: "User with this email already exists." };
        }

        const hashedPassword = hashSync(password, 10);

        await prisma.user.create({
            data: { name, email, password: hashedPassword },
        });

        return { success: true, message: "User created successfully." };
    } catch (error) {
        console.error("Sign-up error:", error);
        return { success: false, message: "An error occurred during sign-up. Please try again later." };
    }
}
