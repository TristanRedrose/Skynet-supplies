import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { finalize } from "rxjs";
import { CreateCategoryRequest } from "src/app/models/categories/createCategoryRequest.models";
import { CategoryService } from "src/app/services/categories/category.service";
import { LoadingService } from "src/app/services/loading/loading.service";

@Component({
    selector: 'add-category',
    templateUrl: './addCategory.component.html',
    styleUrls: ['./addCategory.component.scss']
})

export class AddCategoryComponent implements OnInit {

    constructor(
        private loadingService: LoadingService,
        private categoryService: CategoryService,
        private router: Router
    ) {}

    ngOnInit(): void {
        
    }

    addCategory(categoryData: CreateCategoryRequest) {
        this.loadingService.show();
        this.categoryService.addCategory(categoryData)
        .pipe(finalize(() => {
            this.loadingService.hide();
            this.router.navigate(['admin/categories']);
        }))
        .subscribe();
    }
}