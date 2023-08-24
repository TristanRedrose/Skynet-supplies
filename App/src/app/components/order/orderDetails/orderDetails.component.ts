import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { finalize } from "rxjs";
import { OrderDetails } from "src/app/models/order/orderDetails.type";
import { LoadingService } from "src/app/services/loading/loading.service";
import { OrderService } from "src/app/services/order/order.service";

@Component({
    selector: 'order-details-component',
    templateUrl: './orderDetails.component.html',
    styleUrls: ['./orderDetails.component.scss'],
})

export class OrderDetailsComponent implements OnInit {
    order!: OrderDetails;
    id: string = '';
    loading$ = this.loadingService.loading$;
    

    constructor(
        private orderService: OrderService,
        private loadingService: LoadingService,
        private route: ActivatedRoute,
    ) {}

    ngOnInit(): void {
        this.route.queryParams.subscribe(params => {
            this.id = params['id'];
        });

        if (this.id) {
            this.loadingService.show();
            this.orderService
            .getOrderById(this.id)
            .pipe(finalize(() =>{
                this.loadingService.hide();
            }))
            .subscribe(res => {
                this.order = res;
            })
        }
    }
}