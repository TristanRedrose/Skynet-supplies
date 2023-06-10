import { Component, OnInit } from "@angular/core";
import { SessionService } from "src/app/services/auth/session.service";
import { CartService } from "src/app/services/cart/cart.service";

@Component({
    selector: 'main-navbar-component',
    templateUrl: './main-navbar.component.html',
    styleUrls: ['./main-navbar.component.scss']
})

export class MainNavComponent implements OnInit {
    userLoggedIn: boolean = false;
    cartItemCount$ = this.cartService.cartItemCountSubject$;
    
    constructor(
        private sessionService: SessionService,
        private cartService: CartService,
    ) {}

    ngOnInit(): void {
        this.sessionService.checkSession();
        
        this.sessionService.userLoggedIn().subscribe(isLoggedIn => {
            this.userLoggedIn = isLoggedIn;
        });
    }

    logOut(): void {
        this.sessionService.logOut();
        this.userLoggedIn = false;
    }
}
