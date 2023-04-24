import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { finalize } from "rxjs";
import { SubCategory } from "src/app/models/categories/category.models";
import { UpdateSubcategoryRequest } from "src/app/models/categories/updateCategory.request";
import { LoadingService } from "src/app/services/loading/loading.service";
import { SubcategoryService } from "src/app/services/subcategories/subcategory.service";

@Component({
    selector: 'editSubcategory-component',
    templateUrl: './editSubcategory.html',
    styleUrls: ['./editSubcategory.scss'],
})

export class EditSubcategoryComponent implements OnInit {

    id: string = '';
    subcategoryData!: SubCategory;
    isLoading = this.loadingService.loading$;

    constructor(
            private route: ActivatedRoute,
            private subcategoryService: SubcategoryService,
            private loadingService: LoadingService,
            private router: Router,
        ) {}

    ngOnInit(): void {
        this.route.queryParams.subscribe(params => {
            this.id = params['id'];
        })

        if (this.id) {
            this.subcategoryService.getSubcategoryData(this.id).subscribe(res => {
                this.subcategoryData = res;
            })
        }
    }

    editSubcategory(subcategoryName: string) {
        let updateSubcategoryRequest: UpdateSubcategoryRequest = {
            subcategoryName: subcategoryName
        }
        this.loadingService.show();
        if (!this.subcategoryData) {
            return
        }

        this.subcategoryService
            .updateSubcategory(updateSubcategoryRequest, this.subcategoryData.categoryId)
            .pipe(finalize(() => {
                this.loadingService.hide();
            }))
            .subscribe(() => {
                this.router.navigate(['/admin/categories']);
            });
    }
}