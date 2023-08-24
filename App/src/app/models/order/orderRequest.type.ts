import { ProductOrder } from "./productOrder.type";

export type OrderRequest = {
    orderedProducts: ProductOrder[],
    totalPrice: number
}