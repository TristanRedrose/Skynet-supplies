import { Component, OnInit } from "@angular/core";
import { Category } from "src/app/models/categories/category.models";
import { CategoryService } from "src/app/services/categories/category.service";

@Component({
    selector: 'category-bar',
    templateUrl: './category-bar.component.html',
    styleUrls: ['./category-bar.component.scss']
})

export class CategoryBarComponent implements OnInit {
    categories!: Category[];

    constructor( private categoryService: CategoryService){}

    ngOnInit(): void {
        this.categoryService
            .getAllCategories()
            .subscribe(res => {
                this.categories = res;
            })
    }
}