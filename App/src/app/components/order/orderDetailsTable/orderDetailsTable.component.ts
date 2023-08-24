import { Component, Input } from "@angular/core";
import { CartItem } from "src/app/models/cart/cart.types"

@Component({
    selector: 'order-details-table',
    templateUrl: './orderDetailsTable.component.html',
    styleUrls: ['./orderDetailsTable.component.scss'],
})

export class OrderDetailsTableComponent {

    @Input() cartItems!: CartItem[];
    @Input() totalPrice: number = 0;

    constructor(
    ) {}
}