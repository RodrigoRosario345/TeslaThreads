"use server";

import prisma from "@/lib/prisma";
import type { GetManyResult } from "../types";

interface Country {
    id: string;
    value: string;
    label: string;
}

function formatCountry(country: { id: string; name: string }): Country {
    return {
        id: country.id,
        value: country.id,
        label: country.name,
    };
}

export async function getCountries(): Promise<GetManyResult<Country>> {
    try {
        const countries = await prisma.country.findMany({
            orderBy: { name: "asc" },
            omit: { createdAt: true, updatedAt: true },
        });

        const formattedCountries = countries.map(formatCountry);

        return { success: true, data: formattedCountries };
    } catch (error) {
        console.error("Error fetching countries:", error);
        return { success: false, data: null, error: "Failed to fetch countries" };
    }
}
