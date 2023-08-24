import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription, finalize } from "rxjs";
import { SubCategory } from "src/app/models/categories/category.models";
import { Category} from "src/app/models/categories/category.models";
import { CategoryService } from "src/app/services/categories/category.service";
import { LoadingService } from "src/app/services/loading/loading.service";

@Component({
    selector: 'category-bar',
    templateUrl: './category-bar.component.html',
    styleUrls: ['./category-bar.component.scss']
})

export class CategoryBarComponent implements OnInit, OnDestroy {
    categories!: Category[];
    itemCount: number = 12;
    subscription!: Subscription;
    selectedCategory: Category | null = null;
    menuOpen: boolean = false;
    loading$ = this.loadingService.loading$;

    constructor( 
        private categoryService: CategoryService,
        private route: ActivatedRoute,
        private loadingService: LoadingService
    ){}

    ngOnInit(): void {
        this.categoryService
            .getAllCategories()
            .pipe(finalize(() => {
                if (this.categories) {
                    this.resolveParams()
                }
            }))
            .subscribe(res => {
                this.categories = res;
            })
    }

    resolveParams(): void {
        this.subscription = this.route.queryParams.subscribe(params => {
            this.selectedCategory = null;
            this.closeMenu();

            if (params['itemsPerPage']) {
                this.itemCount = params['itemsPerPage'];
            }
            if (params['category']) {
                let category = this.categories.find(category => category.name === params['category']);
                if (category) {
                    this.selectedCategory = category;
                }
            }
        })
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    toggleMenu(): void {
        this.menuOpen= !this.menuOpen;
    }

    closeMenu(): void {
        this.menuOpen = false;
    }
}