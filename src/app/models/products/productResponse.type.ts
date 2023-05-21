import { Product } from "./product.type"

export type ProductResponse = {
    products: Product[],
    productCount: number
}