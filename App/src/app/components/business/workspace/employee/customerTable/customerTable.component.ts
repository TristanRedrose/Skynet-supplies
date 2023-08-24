import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { finalize } from "rxjs";
import { User } from "src/app/models/users/user";
import { LoadingService } from "src/app/services/loading/loading.service";
import { UserService } from "src/app/services/users/userService";

@Component({
    selector: 'customer-table-component',
    templateUrl: './customerTable.component.html',
    styleUrls: ['./customerTable.component.scss'],
})

export class CustomerTableComponent implements OnInit {

    customers: User[]  = []
    customer: User | null = null;
    isLoading = this.loadingService.loading$;

    constructor( 
            private loadingService: LoadingService, 
            private userService: UserService,
            private router: Router,
        ) {}

    ngOnInit(): void {
        this.loadingService.show();
        this.userService.getAllCustomers()
            .pipe(finalize(() => {
                this.loadingService.hide();
            }))
            .subscribe((res: User[]) => {
                this.customers = res;
            })
    }

    deleteCustomer(id: string): void {
        this.userService.deleteUser(id).subscribe(() => {
            window.location.reload();
        });
    }

    goToEdit(id:string) {
        this.router.navigate(
            ['/employee/customer/edit'],
            { queryParams: { id: `${id}` }}
          );
    }
}