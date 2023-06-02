import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { finalize } from "rxjs";
import { Product } from "src/app/models/products/product.type";
import { LoadingService } from "src/app/services/loading/loading.service";
import { ProductService } from "src/app/services/products/product.service";

@Component({
    selector: 'product-details-component',
    templateUrl: './productDetails.html',
    styleUrls: ['./productDetails.scss'],
})

export class ProductDetailsComponent implements OnInit {
    product!: Product;
    id: string = "";

    constructor(
        private productService: ProductService,
        private loadingService: LoadingService,
        private route: ActivatedRoute,
    ) {}

    ngOnInit(): void {
        this.route.queryParams.subscribe(params => {
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
}