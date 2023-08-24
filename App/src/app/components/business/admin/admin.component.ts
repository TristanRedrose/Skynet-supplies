import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { SessionService } from "src/app/services/auth/session.service";

@Component({
    selector: "admin-page",
    templateUrl: "./admin.component.html",
    styleUrls: ["./admin.component.scss"]
})

export class AdminPageComponent implements OnInit {

    role: string | null = null;
    name: string | null = null;
    
    constructor(
        private router: Router,
        private sessionService: SessionService,
    ){}

    ngOnInit(): void {
        this.role = this.sessionService.role;
        this.name = this.sessionService.username;

        if (this.router.url === '/admin') {
            this.router.navigate(['/admin/employee']);
        }

        if (this.router.url === '/employee') {
            this.router.navigate(['/employee/customer']);
        }

    }

    logOut(): void {
        this.sessionService.logOut();
    }
}