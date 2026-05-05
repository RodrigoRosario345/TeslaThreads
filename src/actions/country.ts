"use server";

import prisma from "@/lib/prisma";

export async function getCountries() {
    try {
        const countries = await prisma.country.findMany({
            orderBy: {
                name: "asc",
            },
        });
        return countries;
    } catch (error) {
        console.error("Error fetching countries:", error);
        throw new Error("Failed to fetch countries");
    }
}
