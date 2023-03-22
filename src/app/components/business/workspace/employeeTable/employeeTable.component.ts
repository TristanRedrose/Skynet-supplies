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
    employeeData: User | null = null;
    isLoading = this.loadingService.loading$;
    isOpen: boolean = false;

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

    openModal(employee: User): void {
        this.employeeData = employee;
        this.isOpen = true;
    }

    closeModal(): void {
        this.employeeData = null;
        this.isOpen = false;
    }

    deleteUser(id: string): void {
        this.userService.deleteUser(id).subscribe(() => {
            window.location.reload();
        });
    }
}