import { Component, OnInit } from "@angular/core";
import { finalize } from "rxjs";
import { CartItem } from "src/app/models/cart/cart.types";
import { LoadingService } from "src/app/services/loading/loading.service";
import { CartService } from "src/app/services/cart/cart.service";
import { SessionService } from "src/app/services/auth/session.service";
import { Router } from "@angular/router";
import { OrderRequest } from "src/app/models/order/orderRequest.type";
import { OrderService } from "src/app/services/order/order.service";

@Component({
    selector: 'cart-component',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.scss'],
})

export class CartComponent implements OnInit {
    cartItems: CartItem[] = [];
    totalPrice: number = 0;
    loading$ = this.loadingService.loading$;
    userLoggedIn$ = this.sessionService.userLoggedIn$;

    constructor(
        private cartService: CartService,
        private loadingService: LoadingService,
        private sessionService: SessionService,
        private router: Router,
        private orderService: OrderService,
    ) {}
    
    ngOnInit(): void {
        this.getProductsInCart();
    }

    getProductsInCart() {
        if (this.cartService.cart.length) {
            this.loadingService.show();
            this.cartService
                .getProductsInCart()
                .pipe(finalize(() => {
                    this.loadingService.hide();
                }))
                .subscribe(res => {
                    this.cartItems = res.cartItems;
                    res.cartItems.forEach(element => {
                        this.totalPrice += element.totalPrice;
                    });

                    this.totalPrice = +this.totalPrice.toFixed(2);
                });
        } else {
            this.cartItems = [];
        }
    }

    refreshPage() {
        this.totalPrice = 0;
        this.getProductsInCart();
    }

    placeOrder():void {
        const orderRequest: OrderRequest = {
            totalPrice: this.totalPrice,
            orderedProducts: this.cartService.cart,
        }

        this.orderService.placeOrder(orderRequest).subscribe(() =>{
            this.cartService.clearCart();
            this.router.navigate(['/orders']);
        });
    }

    goToLogin():void {
        this.router.navigate(['/auth/login']);
    }
}