import { Component } from "@angular/core";
import { ModalService } from "src/app/services/modal/modal.service";

@Component({
    selector: 'modal-component',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.scss'],
})

export class ModalComponent {

    modalOpen = this.modalService.modalOpen

    constructor(
            private modalService: ModalService,
        ) {}

    closeModal() {
        this.modalService.hide();
    }
}