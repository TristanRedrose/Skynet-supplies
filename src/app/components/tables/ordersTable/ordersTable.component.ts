import { Component, EventEmitter, Input, Output } from "@angular/core";
import { OrderDetails } from "src/app/models/order/orderDetails.type";
import { ModalService } from "src/app/services/modal/modal.service";
import { OrderStatus } from "src/app/models/enum/orderStatus.enum";

@Component({
    selector: 'orders-table-component',
    templateUrl: 'ordersTable.component.html',
    styleUrls: ['../table.component.scss'],
})

export class OrdersTableComponent {
    @Input() orders!: OrderDetails[];
    orderData: OrderDetails | null = null;
    @Output() newRouteEvent = new EventEmitter<string>();
    @Output() newDeleteEvent = new EventEmitter<string>();
    OrderStatus = OrderStatus;

    constructor(
        private modalService: ModalService,
    ) {}

    productCount(order: OrderDetails): number {
        let productCount = 0;

        order.cartItems.forEach(p => {
            productCount += p.quantity;
        })

        return productCount;
    }

    goToEdit(id: string):void {
        this.newRouteEvent.emit(id);
    }

    openModal(order: OrderDetails): void {
        this.orderData = order;
        this.modalService.show();
    }

    closeModal(): void {
        this.orderData = null;
        this.modalService.hide()
    }

    deleteOrder(id: string) {
        this.newDeleteEvent.emit(id);
    }
}


