import { Role } from "@/generated/prisma/enums";

export interface User {
    email: string;
    password: string;
    name: string;
    role: Role;
    emailVerified?: boolean;
    image?: string | null;
}
