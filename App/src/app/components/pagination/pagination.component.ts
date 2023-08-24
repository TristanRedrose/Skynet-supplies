
import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { Subscription } from "rxjs";

@Component({
    selector: 'pagination-component',
    templateUrl: './pagination.component.html',
    styleUrls: ['./pagination.component.scss']
})

export class PaginationComponent implements OnInit, OnDestroy {
    @Input() productCount: number = 0;
    page: number = 1;
    itemsPerPage: number = 12;
    itemCounts: number[] = [12, 24, 48];
    subscription!: Subscription;

    constructor(
        private route: ActivatedRoute,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.subscription = this.route.queryParams.subscribe(params => {
            this.page = params['page'] ? params['page'] : 1;
            this.itemsPerPage= params['itemsPerPage'] ? params['itemsPerPage'] : 12;
        })
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    setCount(count: EventTarget | null): void {
        const countValue = (count as HTMLSelectElement).value;
        let queryParams: Params = {'itemsPerPage': countValue}
        
        if (parseInt(countValue) > this.productCount) {
            queryParams = {'itemsPerPage': countValue, 'page': 1}
        }

        this.router.navigate(
            [],
            {
                relativeTo: this.route,
                queryParams: queryParams,
                queryParamsHandling: 'merge',
            }
        )
    }

    nextPage(): void {
        if (this.page > Math.ceil(this.productCount / this.itemsPerPage)) {
            return;
        }

        this.page ++;
        this.navigateToPage(this.page);
    }

    previousPage(): void {
        if (this.page === 1) {
            return;
        }

        this.page --;
        this.navigateToPage(this.page);
    }

    navigateToPage(page: number) {
        this.router.navigate(
            [],
            {
                relativeTo: this.route,
                queryParams: {'page': page},
                queryParamsHandling: 'merge',
            }
        )
        window.scroll(0,0);
    }
}