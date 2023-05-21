import { HttpParams } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { finalize } from "rxjs";
import { Product } from "src/app/models/products/product.type";
import { LoadingService } from "src/app/services/loading/loading.service";
import { ProductService } from "src/app/services/products/product.service";

@Component({
    selector: 'products-component',
    templateUrl: './products.component.html',
    styleUrls: ['./products.component.scss'],
})

export class ProductsComponent implements OnInit{
    isLoading = this.loadingService.loading$;
    products!: Product[];
    productCount: number = 0;

    constructor( 
            private loadingService: LoadingService, 
            private productService: ProductService,
            private router: Router,
            private route: ActivatedRoute
        ) {}

    ngOnInit(): void {
        this.route.queryParams.subscribe(params => {
            let filters = new HttpParams().append("page", params['page'])
                                        .append("itemsPerPage", params['itemsPerPage'])

            if (params['category']) {
                filters = filters.append('category', params['category'])
            }

            if (params['subcategory']) {
                filters = filters.append("subcategory", params['subcategory'])
            }

            this.loadProducts(filters);
        });
        
    }

    loadProducts(filters: HttpParams) {
        this.loadingService.show()
        this.productService
            .getAllProducts(filters)
            .pipe(finalize(() => {
                this.loadingService.hide();
            }))
            .subscribe(res => {
                this.products = res.products;
                this.productCount = res.productCount;
            });
    }

    deleteProduct(id: string): void {
        this.loadingService.show();
        this.productService.deleteProduct(id)
            .pipe(finalize(() => {
                this.loadingService.hide();
            }))
            .subscribe(() => {
                window.location.reload();
            });
    }

    goToEdit(id: string): void {
        this.router.navigate(['employee/product/edit'], { queryParams: { id: `${id}` }});
    }
}