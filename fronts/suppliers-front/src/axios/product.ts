import axios from "axios"
import { Category, Product } from "../utils/types"

const BASE_URL = 'http://localhost:3500/api'

export async function getProducts(supplierId: string): Promise<{
    products: Product[],
    status: number
} | undefined> {
    try {
        const response = await axios.get(`${BASE_URL}/Products/?supplierId=${supplierId}&getCategory=true`, {
        })
        return { products: response.data, status: response.status };
    } catch (e) {
        console.log(e)
    }
}

export async function getProductById(id: string): Promise<{
    product: Product,
    status: number
} | undefined> {
    try {
        const response = await axios.get(`${BASE_URL}/Products/${id}`, {
        })
        console.log(response);
        return { product: response.data, status: response.status };
    } catch (e) {
        console.log(e)
    }
}

export async function getCategories(): Promise<{
    categories: Category[],
    status: number
} | undefined> {
    try {
        const response = await axios.get(`${BASE_URL}/Categories`)
        console.log(response);
        return { categories: response.data, status: response.status };
    } catch (e) {
        console.log(e)
    }
}

export async function addProduct(product: Product): Promise<
    {
        product: Product,
        status: number
    } | undefined> {
    try {
        const response = await axios.post(`${BASE_URL}/Products`, product)
        return { product: response.data, status: response.status };
    } catch (e) {
        console.log(e)
    }
}


export async function updateProduct(product: Product): Promise<
    {
        product: Product,
        status: number
    } | undefined> {
    try {
        console.log({ product });
        const response = await axios.put(`${BASE_URL}/Products/${product.id}`, product)
        console.log({ response });
        return { product: response.data, status: response.status };
    } catch (e) {
        console.log(e)
    }
}