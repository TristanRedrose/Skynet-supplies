import { Component, OnInit } from "@angular/core";
import { User } from "src/app/models/users/user";
import { UserService } from "src/app/services/users/userService";

@Component({
    selector: 'employee-table-component',
    templateUrl: './employeeTable.component.html',
    styleUrls: ['./employeeTable.component.scss']
})

export class EmployeeTableComponent implements OnInit {
    constructor(private userService: UserService){}

    employees: User[] = []

    ngOnInit(): void {
        this.userService.getAllEmployees().subscribe((res: User[]) => {
            this.employees = res;
        })

    }
}