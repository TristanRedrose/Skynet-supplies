import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { finalize } from "rxjs";
import { LoadingService } from "src/app/services/loading/loading.service";
import { ActivatedRoute } from "@angular/router";
import { UserService } from "src/app/services/users/userService";
import { UserDetails } from "src/app/models/users/user";

@Component({
    selector: 'employee-edit-form',
    templateUrl: './editEmployee.component.html',
    styleUrls: ['./editEmployee.component.scss']
})

export class EditEmployeeFormComponent implements OnInit {

    id: string = "";
    userFormData: UserDetails | undefined;
    isLoading = this.loadingService.loading$;

    constructor(private userService: UserService, 
        private router: Router, 
        private loadingService: LoadingService,
        private route: ActivatedRoute,
        ) {}
    
    ngOnInit(): void {
        this.route.queryParams.subscribe(params => {
            this.id = params['id'];
        });

        if (this.id) {
            this.userService.getUserData(this.id).subscribe(res => {
                this.userFormData = res;
            })
        };
    }

    updateUser(userData: UserDetails): void{
        this.loadingService.show();
        this.userService.updateUser(userData)
        .pipe(finalize(() => {
            this.loadingService.hide();
        }))
        .subscribe(() => {
            this.router.navigate(['/admin/employee']);
        });
    }

}