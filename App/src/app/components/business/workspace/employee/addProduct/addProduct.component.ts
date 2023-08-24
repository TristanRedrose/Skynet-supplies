import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { finalize } from "rxjs";
import { Category } from "src/app/models/categories/category.models";
import { ProductRequest } from "src/app/models/products/productRequest.type";
import { CategoryService } from "src/app/services/categories/category.service";
import { LoadingService } from "src/app/services/loading/loading.service";
import { ProductService } from "src/app/services/products/product.service";

@Component({
    selector: 'add-product-component',
    templateUrl: './addProduct.component.html',
    styleUrls: ['./addProduct.component.scss']
})

export class AddProductComponent implements OnInit  {

    isLoading = this.loadingService.loading$;
    categories!: Category[];

    constructor(
        private loadingService: LoadingService,
        private productService: ProductService,
        private categoryService: CategoryService,
        private router: Router,
    ) {}

    ngOnInit(): void {
        this.loadingService.show();
        this.categoryService
            .getAllCategories()
            .pipe(finalize(() => {
                this.loadingService.hide();
                })
            )
            .subscribe(res => {
                    this.categories = res;
                }
            );
    }

    addProduct(productRequest: ProductRequest): void {

        this.loadingService.show();

        this.productService
            .addProduct(productRequest)
            .pipe(finalize(() => {
                this.loadingService.hide();
            }))
            .subscribe(() => {
                this.router.navigate(['employee/products'], {queryParams: {page: 1, itemsPerPage: 12}})
            });
    }

}