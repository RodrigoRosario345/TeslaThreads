"use server";

import { CatalogProduct, Gender, ValidTypes } from "@/interfaces";
import prisma from "@/lib/prisma";

export async function getProducts(
    page: number = 1,
    gender?: Gender,
    pageSize: number = 12,
) {
    try {
        // Fetch products with pagination and include related images and category data
        const productsData = await prisma.product.findMany({
            skip: (page - 1) * pageSize,
            take: pageSize,
            where: {
                gender: gender,
            },
            include: {
                images: {
                    select: { url: true },
                },
                category: {
                    select: { name: true },
                },
            },
            omit: {
                createdAt: true,
                updatedAt: true,
            }
        });

        // Transform the data to match the CatalogProduct interface
        const products = productsData.map((product) => ({
            ...product,
            price: Number(product.price),
            images: product.images.map((image) => image.url),
            type: product.category.name as ValidTypes,
        }));

        // Get the total count of products for pagination
        const totalProducts = await prisma.product.count({ where: { gender } });
        const totalPages = Math.ceil(totalProducts / pageSize);

        return {
            products,
            totalProducts,
            totalPages,
        };
    } catch (error) {
        console.error("Error fetching products:", error);
        throw new Error("Failed to fetch products");
    }
}

export async function getProductBySlug(slug: string): Promise<CatalogProduct | null> {
    try {
        const productData = await prisma.product.findUnique({
            where: {
                slug,
            },
            include: {
                images: {
                    select: { url: true },
                },
                category: {
                    select: { name: true },
                },
            },
            omit: {
                createdAt: true,
                updatedAt: true,
            }
        });

        if (!productData) {
            return null;
        }

        // Transform the data to match the CatalogProduct interface
        const product = {
            ...productData,
            price: Number(productData.price),
            images: productData.images.map((image) => image.url),
            type: productData.category.name as ValidTypes,
        };

        return product;
    } catch (error) {
        console.error("Error fetching product:", error);
        throw new Error("Failed to fetch product");
    }
}
