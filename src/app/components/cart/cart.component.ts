import { Component, OnInit } from "@angular/core";
import { finalize } from "rxjs";
import { CartItem } from "src/app/models/cart/cart.types";
import { LoadingService } from "src/app/services/loading/loading.service";
import { CartService } from "src/app/services/cart/cart.service";

@Component({
    selector: 'cart-component',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.scss'],
})

export class CartComponent implements OnInit {
    cartItems: CartItem[] = [];
    totalPrice: number = 0;
    loading$ = this.loadingService.loading$;

    constructor(
        private cartService: CartService,
        private loadingService: LoadingService,
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
}