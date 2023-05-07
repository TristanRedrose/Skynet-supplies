import { Component, Input } from "@angular/core";
import { Product } from "src/app/models/products/product.type";

@Component({
    selector: 'product-box-component',
    templateUrl: './productBox.component.html',
    styleUrls: ['./productBox.cpmponent.scss'],
})

export class ProductBoxComponent {
    @Input() product!: Product;
}