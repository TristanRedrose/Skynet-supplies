import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Product } from "src/app/models/products/product.type";
import { ModalService } from "src/app/services/modal/modal.service";

@Component({
    selector: 'product-table-component',
    templateUrl: './productTable.component.html',
    styleUrls: ['../table.component.scss']
})

export class ProductTableComponent {

    @Input() products: Product[] | null = null;
    productData : Product | null = null;
    @Output() newRouteEvent = new EventEmitter<string>();
    @Output() newDeleteEvent = new EventEmitter<string>();

    constructor( private modalService: ModalService) {}

    openModal(product: Product): void {
        this.productData = product;
        this.modalService.show();
    }

    closeModal(): void {
        this.productData = null;
        this.modalService.hide();
    }

    deleteProduct(id:string): void {
        this.newDeleteEvent.emit(id);
    }

    goToEdit(id: string): void {
        this.newRouteEvent.emit(id);
    }
}