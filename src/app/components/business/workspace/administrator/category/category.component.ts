import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { finalize } from "rxjs";
import { LoadingService } from "src/app/services/loading/loading.service";
import { CategoryService } from "src/app/services/categories/category.service";
import { Category } from "src/app/models/categories/category.models";
import { ModalService } from "src/app/services/modal/modal.service";

@Component({
    selector: 'category-component',
    templateUrl: './category.component.html',
    styleUrls: ['./category.component.scss']
})

export class CategoryComponent implements OnInit {
    categories: Category[] = [];
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