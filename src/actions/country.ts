"use server";

import prisma from "@/lib/prisma";

interface Country {
    id: string;
    value: string;
    label: string;
}

type CountriesResult =
    | { success: true; countries: Country[] }
    | { success: false; countries: null; error: string };

export async function getCountries(): Promise<CountriesResult> {
    try {
        const countries = await prisma.country.findMany({
            orderBy: {
                name: "asc",
            },
        });

        const formattedCountries = countries.map((country) => ({
            id: country.id,
            value: country.id,
            label: country.name,
        }));

        return { success: true, countries: formattedCountries };
    } catch (error) {
        console.error("Error fetching countries:", error);
        return {
            success: false,
            countries: null,
            error: "Failed to fetch countries",
        };
    }
}
