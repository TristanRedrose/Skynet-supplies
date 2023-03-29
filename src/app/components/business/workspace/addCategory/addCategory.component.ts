import { Component, OnInit } from "@angular/core";
import { finalize } from "rxjs";
import { Category } from "src/app/models/categories/category.models";
import { CategoryService } from "src/app/services/categories/category.service";
import { LoadingService } from "src/app/services/loading/loading.service";

@Component({
    selector: 'add-category',
    templateUrl: './addCategory.component.html',
    styleUrls: ['./addCategory.component.scss']
})

export class AddCategoryComponent implements OnInit {

    isLoading = this.loadingService.loading$;

    constructor(private loadingService: LoadingService,
        private categoryService: CategoryService
    ) {}

    ngOnInit(): void {
        
    }

    addCategory(categoryData: Category) {
        this.loadingService.show();
        this.categoryService.addCategory(categoryData)
        .pipe(finalize(() => {
            this.loadingService.hide();
        }))
        .subscribe();
    }
}