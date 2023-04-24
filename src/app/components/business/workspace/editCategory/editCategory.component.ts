import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { finalize } from "rxjs";
import { LoadingService } from "src/app/services/loading/loading.service";
import { ActivatedRoute } from "@angular/router";
import { Category, SubCategory } from "src/app/models/categories/category.models";
import { CategoryService } from "src/app/services/categories/category.service";
import { SubcategoryService } from "src/app/services/subcategories/subcategory.service";
import { UpdateCategoryRequest } from "src/app/models/categories/updateCategory.request";
import { ModalService } from "src/app/services/modal/modal.service";

@Component({
    selector: 'category-edit-form',
    templateUrl: './editCategory.component.html',
    styleUrls: ['./editCategory.component.scss']
})

export class EditCategoryFormComponent implements OnInit {

    id: string = "";
    categoryData: Category | undefined;
    registrationSuccess: boolean = false;
    isLoading = this.loadingService.loading$;
    subcategoryData: SubCategory | null = null;

    constructor(
            private categoryService: CategoryService, 
            private router: Router, 
            private loadingService: LoadingService,
            private route: ActivatedRoute,
            private subcategoryService: SubcategoryService,
            private modalService: ModalService,
        ) {}
    
    ngOnInit(): void {
        this.route.queryParams.subscribe(params => {
            this.id = params['id'];
        });

        if (this.id) {
            this.categoryService.getCategory(this.id).subscribe(res => {
                this.categoryData = res;
            })
        };
    }

    openModal(subcategory: SubCategory): void {
        this.subcategoryData = subcategory;
        this.modalService.show()
    }

    closeModal(): void {
        this.subcategoryData = null;
        this.modalService.hide();
    }

    get subcategories(): SubCategory[] | undefined {
        if (this.categoryData) {
            return this.categoryData.subcategories;
        }

        return undefined;
    }

    updateCategory(categoryName: string): void{
        let updateCategoryRequest: UpdateCategoryRequest = {
            categoryName: categoryName
        }
        this.loadingService.show();
        if (!this.categoryData) {
            return
        }

        this.categoryService
            .updateCategory(updateCategoryRequest, this.categoryData.categoryId)
            .pipe(finalize(() => {
                this.loadingService.hide();
            }))
            .subscribe(() => {
                this.router.navigate(['/admin/categories']);
            });
    }

    deleteSubcategory(id: string) {
        this.subcategoryService.deleteSubcategory(id).subscribe(() => {
            window.location.reload();
        });
    }

    goToEdit(id: string) {
        this.router.navigate(
            ['/admin/subcategories/edit'],
            { queryParams: { id: `${id}` }}
        );
    }

}