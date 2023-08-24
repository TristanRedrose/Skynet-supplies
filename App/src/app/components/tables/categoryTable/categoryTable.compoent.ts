import { Component, EventEmitter, Input, Output } from "@angular/core";
import { ModalService } from "src/app/services/modal/modal.service";
import { Category } from "src/app/models/categories/category.models";

@Component({
    selector: 'categories-table-component',
    templateUrl: 'categoryTable.component.html',
    styleUrls: ['../table.component.scss'],
})

export class CategoryTableComponent {
    @Input() categories!: Category[];
    categoryData: Category | null = null;
    @Output() newRouteEvent = new EventEmitter<string>();
    @Output() newDeleteEvent = new EventEmitter<string>();

    constructor(
        private modalService: ModalService,
    ) {}

    goToEdit(id: string):void {
        this.newRouteEvent.emit(id);
    }

    openModal(category: Category): void {
        this.categoryData = category;
        this.modalService.show();
    }

    closeModal(): void {
        this.categoryData = null;
        this.modalService.hide()
    }

    deleteCategory(id: string) {
        this.newDeleteEvent.emit(id);
    }
}