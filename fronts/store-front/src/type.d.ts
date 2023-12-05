type Category = {
    id: string,
    name: string
}

type Product = {
    id: string
    name: string
    description: string
    price: number
    discountPrice?: number
    stock: number
    rating: number
    supplierId: string
    categoryId: string
    category?: Category
}