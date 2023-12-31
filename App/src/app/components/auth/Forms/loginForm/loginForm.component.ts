import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { LoginRequest } from "src/app/models/auth/authRequest.types";
import { AuthFormFactory } from "src/app/services/factories/auth-form-factory.service";
import { SessionService } from "src/app/services/auth/session.service";
import { LoadingService } from "src/app/services/loading/loading.service";
import { finalize } from "rxjs";

@Component({
    selector: 'login-form',
    templateUrl: './loginForm.component.html',
    styleUrls: ['../../auth.component.scss']
})

export class LoginFormComponent implements OnInit {

    loginForm!: FormGroup;
    isLoading = this.loadingService.loading$;
    validRoles: string[] = ["Admin", "Employee"];

    constructor(private authFormFactory: AuthFormFactory, 
            private sessionService: SessionService,
            private router: Router,
            private loadingService: LoadingService
        ) {}
    
    ngOnInit(): void {
        this.loginForm = this.authFormFactory.loginForm();
    }

    onLogin(): void {
        if (!this.loginForm.valid) {
            return
        }

        const password: string | null = this.loginForm.get('password')?.value;
        const email: string | null = this.loginForm.get('email')?.value;

        if (!email || !password) {
            return;
        }

        const loginRequest: LoginRequest = {
            password: password,
            email: email
        }

        this.loadingService.show();
        this.sessionService.logIn(loginRequest)
            .pipe(finalize(() => {
                this.loadingService.hide();
            }))
            .subscribe(() => {
                if (this.sessionService.role && this.validRoles.includes(this.sessionService.role)) {
                    this.router.navigate([`${this.sessionService.role.toLowerCase()}`])
                    return;
                }

                this.router.navigate(['']);
            })
    }
}