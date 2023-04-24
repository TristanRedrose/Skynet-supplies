import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { finalize } from "rxjs";
import { LoadingService } from "src/app/services/loading/loading.service";
import { CategoryService } from "src/app/services/categories/category.service";
import { Category } from "src/app/models/categories/category.models";
import { ModalService } from "src/app/services/modal/modal.service";

@Component({
    selector: 'category-table-component',
    templateUrl: './categoryTable.component.html',
    styleUrls: ['./categoryTable.component.scss']
})

export class CategoryTableComponent implements OnInit {
    categories: Category[] = [];
    categoryData: Category | null = null;
    isLoading = this.loadingService.loading$;

    constructor(private categoryService: CategoryService, 
        private loadingService: LoadingService,
        private router: Router,
        private modalService: ModalService,
    ){}

    ngOnInit(): void {
        this.loadingService.show();
        this.categoryService.getAllCategories()
            .pipe(finalize(() => {
                this.loadingService.hide();
            }))
            .subscribe((res: Category[]) => {
                this.categories = res;
            })
    }

    openModal(category: Category): void {
        this.categoryData = category;
        this.modalService.show();
    }

    closeModal(): void {
        this.categoryData = null;
        this.modalService.hide();
    }

    deleteCategory(id: string): void {
        this.categoryService.deleteCategory(id).subscribe(() => {
            window.location.reload();
        });
    }

    goToEdit(id:string) {
        this.router.navigate(
            ['/admin/categories/edit'],
            { queryParams: { id: `${id}` }}
          );
    }
}