import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription, finalize } from "rxjs";
import { Product } from "src/app/models/products/product.type";
import { LoadingService } from "src/app/services/loading/loading.service";
import { ProductService } from "src/app/services/products/product.service";
import { ActivatedRoute } from "@angular/router";
import { HttpParams } from "@angular/common/http";

@Component ({
    selector: 'product-showcase-component',
    templateUrl: './productShowcase.component.html',
    styleUrls: ['./productShowcase.component.scss'],
})

export class ProductShowcaseComponent implements OnInit, OnDestroy {
    products!: Product[];
    productCount: number = 0;
    subscription!: Subscription;
    category: string = "";

    constructor(
        private productService: ProductService,
        private loadingService: LoadingService,
        private route: ActivatedRoute
    ) {}

    ngOnInit(): void {
        this.subscription = this.route.queryParams.subscribe(params => {
            let filters = new HttpParams().append("page", params['page'] ? params['page'] : 1)
                                        .append("itemsPerPage", params['itemsPerPage'] ? params['itemsPerPage'] : 12)
            
            if (params['category']){
                filters = filters.append("category", params['category']);
                this.category = params['category'];
            }                            

            if (params['subcategory']) {
                filters = filters.append("subcategory", params['subcategory'])
            }

            this.loadProducts(filters);
        });
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    loadProducts(filters: HttpParams) {
        this.loadingService.show();
        this.productService
            .getAllProducts(filters)
            .pipe(finalize(() => {
                
                this.loadingService.hide();
            }))
            .subscribe(res => {
                this.products = res.products;
                this.productCount = res.productCount;
            })
    }
}