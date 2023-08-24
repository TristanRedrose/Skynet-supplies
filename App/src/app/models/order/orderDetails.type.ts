import { CartItem } from "../cart/cart.types"
import { OrderStatus } from "../enum/orderStatus.enum"

export type OrderDetails = {
    customerId: string,
    customerName: string,
    orderId: string,
    checkoutPrice: number,
    cartItems: CartItem[],
    status: OrderStatus,
}