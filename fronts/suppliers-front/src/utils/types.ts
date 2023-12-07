export interface Product {
    supplierId?: string;
    name: string;
    imgLink: string;
    stock: number | undefined;
    categoryId: string;
    description: string;
    price: number | undefined;
}

export interface Category {
    id: string;
    name: string;
}