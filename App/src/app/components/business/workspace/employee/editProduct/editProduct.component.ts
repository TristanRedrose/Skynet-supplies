import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { finalize } from "rxjs";
import { Category } from "src/app/models/categories/category.models";
import { Product } from "src/app/models/products/product.type";
import { ProductRequest } from "src/app/models/products/productRequest.type";
import { CategoryService } from "src/app/services/categories/category.service";
import { LoadingService } from "src/app/services/loading/loading.service";
import { ProductService } from "src/app/services/products/product.service";

@Component({
    selector: 'edit-product-component',
    templateUrl: './editProduct.component.html',
    styleUrls: ['./editProduct.component.scss'],
})

export class EditProductComponent implements OnInit {

    id: string = '';
    categories!: Category[];
    productData!: Product;

    constructor(
        private categoryService: CategoryService,
        private loadingService: LoadingService,
        private productService: ProductService,
        private route: ActivatedRoute,
        private router: Router,
    ) {}

    ngOnInit(): void {
        this.loadingService.show();

        this.route.queryParams.subscribe(params => {
            this.id = params['id'];
        });

        this.categoryService
            .getAllCategories()
            .subscribe(res => {
                this.categories = res;
            })

        this.productService
            .getProduct(this.id)
            .pipe(finalize(() => {
                this.loadingService.hide();
            }))
            .subscribe(res => {
                this.productData = res;
            })
    }

    editProduct(productRequest: ProductRequest) {
        this.loadingService.show();
        this.productService
            .updateProduct(productRequest, this.id)
            .pipe(finalize(() => {
                this.loadingService.hide();
            }))
            .subscribe(() => {
                this.router.navigate(['employee/products'])
            });
    }
    
}