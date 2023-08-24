import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { SessionService } from "src/app/services/auth/session.service";


@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.scss']
})

export class AuthComponent implements OnInit {

    private _userLoggedIn: boolean = false;

    constructor(private router: Router, private sessionService: SessionService) {}

    ngOnInit(): void {
        this.sessionService.checkSession();

        this.sessionService.userLoggedIn().subscribe(isLoggedIn => {
            this._userLoggedIn = isLoggedIn;
        })

        if (this._userLoggedIn) {
            this.router.navigate([''])
        }

        if (this.router.url === '/auth') {
            this.router.navigate(['/auth/login']);
        }
    }
}