import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { LoginRequest } from "src/app/models/auth/authRequest.types";
import { AuthFormFactory } from "src/app/services/factories/auth-form-factory.service";
import { SessionService } from "src/app/services/auth/session.service";

@Component({
    selector: 'login-form',
    templateUrl: './loginForm.component.html',
    styleUrls: ['../../auth.component.scss']
})

export class LoginFormComponent implements OnInit {

    loginForm!: FormGroup;

    constructor(private authFormFactory: AuthFormFactory, private sessionService: SessionService, private router: Router) {}
    
    ngOnInit(): void {
        this.loginForm = this.authFormFactory.loginForm();
    }

    onLogin(): void {
        if (!this.loginForm.valid) {
            return
        }

        let loginRequest: LoginRequest = {
            password: this.loginForm.get('password')!.value,
            email: this.loginForm.get('email')!.value
        }

        this.sessionService.logIn(loginRequest).subscribe(() => {
            this.router.navigate(['']);
        })

    }
}