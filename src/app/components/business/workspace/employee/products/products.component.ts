import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
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

    constructor( 
            private loadingService: LoadingService, 
            private productService: ProductService,
            private router: Router
        ) {}

    ngOnInit(): void {
        this.loadingService.show()
        this.productService
            .getAllProducts()
            .pipe(finalize(() => {
                this.loadingService.hide();
            }))
            .subscribe(res => {
                this.products = res;
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