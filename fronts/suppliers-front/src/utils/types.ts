export interface Product {
    id?: string;
    supplierId?: string;
    name: string;
    imagePath: string;
    stock: number | undefined;
    categoryId: string;
    description: string;
    price: number | undefined;
    discountPrice?: number;
    category?: Category;
}

export interface Category {
    id: string;
    name: string;
}