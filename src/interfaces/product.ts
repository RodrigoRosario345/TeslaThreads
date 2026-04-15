export interface CatalogProduct {
    id: string;
    description: string;
    images: string[];
    inStock: number;
    price: number;
    sizes: ValidSizes[];
    slug: string;
    tags: string[];
    title: string;
    type: ValidTypes;
    gender: Gender;
}

export type ValidSizes = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL' | 'XXXL';
export type ValidTypes = 'shirts' | 'pants' | 'hoodies' | 'hats';
export type Gender = 'men' | 'women' | 'kid' | 'unisex'

export interface CatalogData {
    categories: Record<"name", ValidTypes>[],
    products: CatalogProduct[],
}