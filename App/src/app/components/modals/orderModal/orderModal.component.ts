import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { ProductOrder } from "src/app/models/order/productOrder.type";
import { Product } from "src/app/models/products/product.type";
import { ModalService } from "src/app/services/modal/modal.service";
import { CartService } from "src/app/services/cart/cart.service";

@Component({
    selector: 'order-modal-component',
    templateUrl: './orderModal.component.html',
    styleUrls: ['./orderModal.component.scss']
})

export class OrderModalComponent implements OnInit, OnDestroy {
    @Input() product!: Product;
    quantity: number = 1;
    subscription!: Subscription;

    constructor(
        private modalService: ModalService,
        private cartService: CartService
    ) {}

    ngOnInit(): void {
        this.subscription = this.modalService.modalOpen.subscribe((modalOpen) => {
            if (!modalOpen) {
                this.quantity = 1;
            }
        })
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    decrementQuantity(): void {
        if (this.quantity > 1){
            this.quantity--;
        }
    }

    incrementQuantity(): void {
        this.quantity++;
    }

    closeModal(): void {
        this.modalService.hide();
    }

    addToOrder(): void {
        const productOrder: ProductOrder = {
            productId: +this.product.productId,
            quantity: this.quantity,
        }

        this.cartService.addProductToCart(productOrder);

        this.modalService.hide();
    }
}