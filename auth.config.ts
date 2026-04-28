import prisma from "@/lib/prisma";
import { compareSync } from "bcryptjs";
import NextAuth, { type NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import z from "zod";

const authConfig: NextAuthConfig = {
  pages: {
    signIn: "/auth/sign-in",
    newUser: "/auth/sign-up",
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
};

export const { signIn, signOut, auth, handlers: { GET, POST } } = NextAuth(authConfig);
