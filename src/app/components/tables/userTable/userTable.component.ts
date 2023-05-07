import { Component, EventEmitter, Input, Output } from "@angular/core";
import { User } from "src/app/models/users/user";
import { ModalService } from "src/app/services/modal/modal.service";

@Component ({
    selector: 'user-table-component',
    templateUrl: './userTable.component.html',
    styleUrls: ['./userTable.component.scss'],
})

export class UserTableComponent {

    @Input() users : User[] | null = null;
    userData : User | null = null;
    @Output() newRouteEvent = new EventEmitter<string>();
    @Output() newDeleteEvent = new EventEmitter<string>();

    constructor( private modalService: ModalService ){}


    openModal(user: User): void {
        this.userData = user;
        this.modalService.show();
    }

    closeModal(): void {
        this.userData = null;
        this.modalService.hide();
    }

    deleteUser(id:string): void {
        this.newDeleteEvent.emit(id);
    }

    goToEdit(id: string): void {
        this.newRouteEvent.emit(id);
    }
}