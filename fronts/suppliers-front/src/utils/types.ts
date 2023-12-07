export interface Product {
    supplierId?: string;
    name: string;
    imagePath: string;
    stock: number | undefined;
    categoryId: string;
    description: string;
    price: number | undefined;
    discountPrice?: number;
}

export interface Category {
    id: string;
    name: string;
}