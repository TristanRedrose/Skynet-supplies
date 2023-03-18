import { Component, OnInit } from "@angular/core";
import { finalize } from "rxjs";
import { User } from "src/app/models/users/user";
import { LoadingService } from "src/app/services/loading/loading.service";
import { UserService } from "src/app/services/users/userService";

@Component({
    selector: 'employee-table-component',
    templateUrl: './employeeTable.component.html',
    styleUrls: ['./employeeTable.component.scss']
})

export class EmployeeTableComponent implements OnInit {
    employees: User[] = [];
    isLoading = this.loadingService.loading$;

    constructor(private userService: UserService, private loadingService: LoadingService){}

    ngOnInit(): void {
        this.loadingService.show();
        this.userService.getAllEmployees()
            .pipe(finalize(() => {
                this.loadingService.hide();
            }))
            .subscribe((res: User[]) => {
                this.employees = res;
            })
    }
}