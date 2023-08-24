import { Component, OnInit } from "@angular/core";
import { finalize } from "rxjs";
import { OrderDetails } from "src/app/models/order/orderDetails.type";
import { LoadingService } from "src/app/services/loading/loading.service";
import { OrderService } from "src/app/services/order/order.service";

@Component({
    selector: 'order-component',
    templateUrl: './orders.component.html',
    styleUrls: ['./orders.component.scss']
})

export class BusinessOrdersComponent implements OnInit {
    orders!: OrderDetails[];
    isLoading$ = this.loadingService.loading$;

    constructor(
        private orderService: OrderService,
        private loadingService: LoadingService
    ) {}

    ngOnInit(): void {
        this.loadOrders();
    }

    goToEdit(id:string): void {

    }

    deleteOrder(id:string): void {
        this.loadingService.show();
        this.orderService
            .deleteOrder(id)
            .pipe(finalize(() => {
                this.loadingService.hide();
            }))
            .subscribe(() => {
                this.loadOrders();
            });
    }

    loadOrders():void {
        this.loadingService.show();
        this.orderService.getAllOrders()
        .pipe(finalize(() => {
            this.loadingService.hide();
        }))
        .subscribe(res => {
            this.orders = res.orders;
        })
    }
}

