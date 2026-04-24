import "dotenv/config";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@/generated/prisma/client";
import { hashSync } from "bcryptjs";
import { catalogData, USERS } from "@/data";

const connectionString = `${process.env.DATABASE_URL}`;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
    // Delete existing data
    await prisma.user.deleteMany();
    await prisma.productImage.deleteMany();
    await prisma.product.deleteMany();
    await prisma.category.deleteMany();

    // Insert categories
    const createdCategories = await prisma.category.createManyAndReturn({
        data: catalogData.categories,
    });

    // Group categories by name for easy lookup
    const categoriesGroupedByName = createdCategories.reduce(
        (acc, category) => {
            acc[category.name] = category.id;
            return acc;
        },
        {} as Record<string, number>,
    );

    // Insert products and their images
    await Promise.all(
        catalogData.products.map(async (product) => {
            const { id, type, images, ...productData } = product;
            const categoryId = categoriesGroupedByName[type];

            const createdProduct = await prisma.product.create({
                data: {
                    ...productData,
                    categoryId,
                },
            });

            const productImagesData = images.map((image) => ({
                url: image,
                productId: createdProduct.id,
            }));

            await prisma.productImage.createMany({
                data: productImagesData,
            });
        }),
    );

    // Insert users with hashed passwords
    await prisma.user.createMany({
        data: USERS.map((user) => ({
            ...user,
            password: hashSync(user.password, 10),
        })),
    });
}

main()
    .then(async () => {
        await prisma.$disconnect();
        await pool.end();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        await pool.end();
        process.exit(1);
    });
