import NextAuth, { DefaultSession } from "next-auth"

declare module "next-auth" {
    interface Session {
        user: {
            id: string;
            email: string;
            name: string;
            role: string;
            emailVerified?: boolean;
            image?: string | null;
        } & DefaultSession["user"]
    }
}