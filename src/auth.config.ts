import prisma from "@/lib/prisma";
import { compareSync } from "bcryptjs";
import NextAuth, { type NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import z from "zod";

export const authConfig: NextAuthConfig = {
  pages: {
    signIn: "/auth/sign-in",
    newUser: "/auth/sign-up",
    signOut: "/"
  },
  providers: [
    Credentials({
      async authorize(credentials) {

        const parsedCredentials = z
          .object({
            email: z.string().email(),
            password: z.string().min(8),
          })
          .safeParse(credentials);

        // 1. Validate the credentials using Zod
        if (!parsedCredentials.success) return null;

        // 2. Find the user in the database using Prisma
        const { email, password } = parsedCredentials.data;
        const user = await prisma.user.findUnique({
          where: {
            email,
          },
        });

        // 3. If the user doesn't exist, return null
        if (!user) return null;

        // 4. Verify the password (you should hash and compare in a real application)
        if (!compareSync(password, user.password)) return null;

        // 5. If everything is valid, return the user object without the password
        const { password: _, ...userWithoutPassword } = user;

        return userWithoutPassword;
      },
    }),
  ],
  callbacks: {
    // function that runs on every request to check if the user is authorized to access a route
    // Checks if the user is logged in and if the route is protected (starts with /checkout)
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;

      const isProtectedRoute = nextUrl.pathname.startsWith("/checkout");

      if (isProtectedRoute) {
        // automatically redirects to the sign-in page if the user is not logged in additionally to the callbackUrl query parameter with the current route
        return isLoggedIn; 
      }

      return true;
    },
    async session({ session, token }) {
      if (token.data) {
        session.user = token.data as any;
      }
      return session;
    }
  }
};

export const { signIn, signOut, auth, handlers } = NextAuth(authConfig);
