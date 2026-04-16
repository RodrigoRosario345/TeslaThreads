"use server";

import { Gender, ValidTypes } from "@/interfaces";
import prisma from "@/lib/prisma";

export async function getProducts(page: number = 1, gender?: Gender, pageSize: number = 12) {

    // Fetch products with pagination and include related images and category data
    const productsData = await prisma.product.findMany({
        skip: (page - 1) * pageSize,
        take: pageSize,
        where: {
            gender: gender
        },
        include: {
            images: {
                select: { url: true },
            },
            category: {
                select: { name: true },
            },
        },
    });

    // Transform the data to match the CatalogProduct interface
    const products = productsData.map((product) => ({
        ...product,
        images: product.images.map((image) => image.url),
        type: product.category.name as ValidTypes,
    }));

    // Get the total count of products for pagination
    const totalProducts = gender ? await prisma.product.count({ where: { gender } }) : await prisma.product.count();
    
    console.log("Total products:", totalProducts);

    return {
        products,
        totalProducts,
        totalPages: Math.ceil(totalProducts / pageSize),
    };
}
