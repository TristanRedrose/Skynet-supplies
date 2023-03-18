import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
    selector: "admin-page",
    templateUrl: "./admin.component.html",
    styleUrls: ["./admin.component.scss"]
})

export class AdminPageComponent implements OnInit {
    
    constructor(private router: Router){}

    ngOnInit(): void {
        if (this.router.url === '/admin') {
            this.router.navigate(['/admin/employee']);
        }
    }
}