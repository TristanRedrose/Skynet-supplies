import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { finalize } from "rxjs";
import { User } from "src/app/models/users/user";
import { LoadingService } from "src/app/services/loading/loading.service";
import { ModalService } from "src/app/services/modal/modal.service";
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

    constructor(private userService: UserService, 
        private loadingService: LoadingService,
        private router: Router,
    ){}

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

    deleteEmployee(id: string): void {
        this.userService.deleteUser(id).subscribe(() => {
            window.location.reload();
        });
    }

    goToEdit(id:string) {
        this.router.navigate(
            ['/admin/employee/edit'],
            { queryParams: { id: `${id}` }}
          );
    }
}