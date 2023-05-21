import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { Category } from "src/app/models/categories/category.models";
import { CategoryService } from "src/app/services/categories/category.service";

@Component({
    selector: 'category-bar',
    templateUrl: './category-bar.component.html',
    styleUrls: ['./category-bar.component.scss']
})

export class CategoryBarComponent implements OnInit, OnDestroy {
    categories!: Category[];
    itemCount: number = 12;
    subscription!: Subscription;

    constructor( 
        private categoryService: CategoryService,
        private route: ActivatedRoute
    ){}

    ngOnInit(): void {

        this.categoryService
            .getAllCategories()
            .subscribe(res => {
                this.categories = res;
            })
        
        this.subscription = this.route.queryParams.subscribe(params => {
            if (params['itemsPerPage']) {
                this.itemCount = params['itemsPerPage'];
            }
        })
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
}