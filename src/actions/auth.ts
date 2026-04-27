"use server";


import { AuthError } from "next-auth";
import { signIn } from "../../auth.config";
import { userSignInSchemaOutput } from "@/interfaces/user";

export async function authenticate(
    formData: userSignInSchemaOutput,
): Promise<string | undefined> {
    try {
        console.log("Authenticating with form data:", formData);
        await signIn("credentials", formData);
        return undefined;
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return "Invalid email or password.";
                default:
                    return "Something went wrong.";
            }
        }
        throw error;
    }
}
    