import { Component, OnInit } from "@angular/core";
import { SessionService } from "src/app/services/auth/session.service";

@Component({
    selector: 'main-navbar-component',
    templateUrl: './main-navbar.component.html',
    styleUrls: ['./main-navbar.component.scss']
})

export class MainNavComponent implements OnInit {
    userLoggedIn: boolean = false;
    
    constructor(private sessionService: SessionService) {}

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
