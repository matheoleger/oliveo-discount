type Category = {
    id: string,
    name: string
}

type Product = {
    id: string
    name: string
    description: string
    imagePath: string
    price: number
    discountPrice?: number
    stock: number
    rating: number
    supplierId: string
    categoryId: string
    category?: Category
}

type CartProduct = {
    id: string
    name: string
    price: number
    discountPrice?: number
    imagePath: string
}