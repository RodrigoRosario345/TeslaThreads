"use server";

import { AuthError } from "next-auth";
import { signIn, signOut } from "../../auth.config";
import { userSignInSchemaOutput } from "@/interfaces/user";

export async function signInAction(
  formData: userSignInSchemaOutput,
): Promise<string | undefined> {
  try {
    await signIn("credentials", formData);
    return;
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

export async function signOutAction() {
  try {
    await signOut();
  } catch (error) {
    console.error("Error signing out:", error);
  }
}
