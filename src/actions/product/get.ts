"use server";

import { CatalogProduct, Gender, ValidTypes } from "@/interfaces";
import prisma from "@/lib/prisma";

interface PaginatedProductsResult {
    products: CatalogProduct[];
    totalProducts: number;
    totalPages: number;
}

function formatProduct(product: any): CatalogProduct {
    return {
        ...product,
        price: Number(product.price),
        images: product.images.map((image: any) => image.url),
        type: product.category.name as ValidTypes,
    };
}

export async function getProducts(
    page: number = 1,
    gender?: Gender,
    pageSize: number = 12,
): Promise<PaginatedProductsResult> {
    try {
        const productsData = await prisma.product.findMany({
            skip: (page - 1) * pageSize,
            take: pageSize,
            where: { gender },
            include: {
                images: { select: { url: true } },
                category: { select: { name: true } },
            },
        });

        const products = productsData.map((product) => formatProduct(product));

        const totalProducts = await prisma.product.count({ where: { gender } });
        const totalPages = Math.ceil(totalProducts / pageSize);

        return { products, totalProducts, totalPages };
    } catch (error) {
        console.error("Error fetching products:", error);
        throw new Error("Failed to fetch products");
    }
}

export async function getProductBySlug(slug: string): Promise<CatalogProduct | null> {
    try {
        const productData = await prisma.product.findUnique({
            where: { slug },
            include: {
                images: { select: { url: true } },
                category: { select: { name: true } },
            },
        });

        if (!productData) return null;

        return formatProduct(productData);
    } catch (error) {
        console.error("Error fetching product:", error);
        throw new Error("Failed to fetch product");
    }
}
