import { Component, EventEmitter, OnDestroy, OnInit, Output } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Subscription, finalize } from "rxjs";
import { Product } from "src/app/models/products/product.type";
import { LoadingService } from "src/app/services/loading/loading.service";
import { ModalService } from "src/app/services/modal/modal.service";
import { ProductService } from "src/app/services/products/product.service";

@Component({
    selector: 'product-details-component',
    templateUrl: './productDetails.html',
    styleUrls: ['./productDetails.scss'],
})

export class ProductDetailsComponent implements OnInit, OnDestroy {
    product!: Product;
    id: string = "";
    subscription!: Subscription;

    constructor(
        private productService: ProductService,
        private loadingService: LoadingService,
        private route: ActivatedRoute,
        private modalService: ModalService
    ) {}

    ngOnInit(): void {
        this.subscription = this.route.queryParams.subscribe(params => {
            this.id = params['id'];
        });

        if (this.id) {
            this.loadingService.show()
            this.productService
                .getProduct(this.id)
                .pipe(finalize(() => {
                    this.loadingService.hide();
                }))
                .subscribe(res => {
                    this.product = res
                    console.log(this.product)
                })
        }
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
        if (this.modalService.modalOpen.value === true) {
            this.modalService.hide();
        }
    }

    onClick():void {
        this.modalService.show();
    }
}