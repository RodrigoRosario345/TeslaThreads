"use server";

import { AuthError } from "next-auth";

import { userSignInSchemaOutput, userSignUpSchemaOutput } from "@/interfaces/user";
import prisma from "@/lib/prisma";
import { hashSync } from "bcryptjs";
import { signIn, signOut } from "@/auth.config";

interface SignInResult {
  success: boolean;
  message: string;
}

export async function signInAction(formData: userSignInSchemaOutput): Promise<SignInResult> {
  try {
    await signIn("credentials", formData);
    return {
      success: true,
      message: "Signed in successfully.",
    }
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return {
            success: false,
            message: "Invalid email or password.",
          };
        default:
          return {
            success: false,
            message: "Something went wrong.",
          };
      }
    }
    throw error;
  }
}

export async function signOutAction() {
  await signOut();
}

export async function signUpAction(formData: userSignUpSchemaOutput) {
  try {
    // 1. Extract data from formData
    const { name, email, password } = formData;

    // 2. Check if user with this email already exists in the database
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return {
        success: false,
        message: "User with this email already exists.",
      };
    }

    // 3. Hash the password before saving to the database
    const hashedPassword = hashSync(password, 10);

    // 4. Create a new user in the database
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    return {
      success: true,
      message: "User created successfully.",
    };

  } catch (error) {
    // Handle errors that may occur during sign-up
    console.error("Sign-up error:", error);
    return {
      success: false,
      message: "An error occurred during sign-up. Please try again later.",
    }
  }
}
