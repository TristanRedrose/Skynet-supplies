import { Component, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { CartItem } from "src/app/models/cart/cart.types";
import { OrderStatus } from "src/app/models/enum/orderStatus.enum";
import { OrderDetails } from "src/app/models/order/orderDetails.type";

@Component({
    selector: 'order-box-component',
    templateUrl: './orderBox.component.html',
    styleUrls: ['./orderBox.component.scss']
})

export class OrderBoxComponent implements OnInit {
    @Input() order!: OrderDetails;
    productImage!: string;
    OrderStatus = OrderStatus;

    constructor(
        private router:Router
    ) {

    }

    ngOnInit(): void {
        this.getHighestCostProductImage();
    }

    getHighestCostProductImage(): void {
        let product: CartItem;

        if (this.order.cartItems.length < 1) {
            return;
        }

        this.order.cartItems.forEach(p => {
            if (!product || product.price < p.price) {
                product = p;
            }
        })

        this.productImage =product!.imageUrl;
    }

    productCount(order: OrderDetails): number {
        let productCount = 0;

        order.cartItems.forEach(p => {
            productCount += p.quantity;
        })

        return productCount;
    }

    goToOrderDetails(): void {
        this.router.navigate(['/order'], {queryParams: {id: this.order.orderId}})
    }
}