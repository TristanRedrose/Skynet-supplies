export type CartItem = {
    productId: number,
    name: string,
    imageUrl: string,
    quantity: number,
    price: number,
    totalPrice: number
}

export type CartResponse = {
    cartItems: CartItem[]
}