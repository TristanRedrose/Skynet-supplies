import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { CartItem } from "src/app/models/cart/cart.types"
import { CartService } from "src/app/services/cart/cart.service";

@Component({
    selector: 'cart-item-table',
    templateUrl: './cartItemTable.component.html',
    styleUrls: ['./cartItemTable.component.scss'],
})

export class CartItemTableComponent {

    @Input() cartItems!: CartItem[];
    @Output() cartItemDeleteEvent = new EventEmitter<void>();
    @Input() totalPrice: number = 0;

    constructor(
        private cartService: CartService
    ) {}

    removeProduct(productId: number, quantity: number): void {
        this.cartService.removeProductFromCart(productId, quantity);
        this.cartItemDeleteEvent.emit();
    }
}