
import { Role } from "@/generated/prisma/enums";
import { User } from "@/interfaces";

export const USERS: User[] = [
    {
        email: "rodrigo@teslathreads.com",
        password: "rodrigo123*",
        name: "Admin Tesla Threads",
        role: Role.admin,
        emailVerified: true,
    },
    {
        email: "axel.doe@teslathreads.com",
        password: "axel123*",
        name: "Axel Doe",
        role: Role.user,
        emailVerified: true,
    },
    {
        email: "macario.doe@teslathreads.com",
        password: "macario123*",
        name: "Macario Doe",
        role: Role.user,
        emailVerified: false,
    },
];