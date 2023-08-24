import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: 'root',
})

export class ModalService {

    modalOpen = new BehaviorSubject<boolean>(false);

    show() {
        this.modalOpen.next(true);
    }

    hide() {
        this.modalOpen.next(false);
    }

}