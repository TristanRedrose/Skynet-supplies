import { Component, OnInit } from "@angular/core";
import { SessionService } from "src/app/services/auth/session.service";

@Component({
    selector: 'about-bar',
    templateUrl: './about-bar.component.html',
    styleUrls: ['./about-bar.component.scss']
})

export class AboutBarComponent implements OnInit {
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
