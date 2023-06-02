import { Component, Input } from "@angular/core";
import { Router } from "@angular/router";
import { Product } from "src/app/models/products/product.type";

@Component({
    selector: 'product-box-component',
    templateUrl: './productBox.component.html',
    styleUrls: ['./productBox.component.scss'],
})

export class ProductBoxComponent {
    @Input() product!: Product;

    constructor(
        private router: Router
    ) {}

    goToProduct(id: string): void {
        this.router.navigate(['/product'], {queryParams: {id: id}})
    }
}