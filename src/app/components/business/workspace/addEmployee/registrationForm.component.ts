import { Component, OnInit } from "@angular/core";
import { AbstractControl, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { RegistrationRequest } from "src/app/models/auth/authRequest.types";
import { RegistrationService } from "src/app/services/auth/registration.service";
import { AuthFormFactory } from "src/app/services/factories/auth-form-factory.service";

@Component({
    selector: 'employee-registration-form',
    templateUrl: './registrationForm.component.html',
    styleUrls: ['./registrationForm.component.scss']
})

export class EmployeeRegistrationFormComponent implements OnInit {

    registrationForm!: FormGroup;
    passwordMissmatch: boolean = false;
    registrationSuccess: boolean = false;

    constructor(private authFormFactory: AuthFormFactory, private registrationService: RegistrationService, private router: Router) {}
    
    ngOnInit(): void {
        this.registrationForm = this.authFormFactory.registrationForm();
    }

    onRegistration(): void {
        console.log(this.registrationForm);
        this.registrationForm.markAllAsTouched();

        if (this.registrationForm.value.passwordsInput.password !== this.registrationForm.value.passwordsInput.passConfirm) {
            let passwordsInput = this.registrationForm.get('passwordsInput')!;

            this.passwordMissmatch = true;

            this.password.setErrors({'passwordMissmatch': true});
            this.passConfirm.setErrors({'passwordMissmatch': true});
            let subscription = passwordsInput.valueChanges.subscribe(() => {
                if ((!this.password.value.trim() || !this.passConfirm.value.trim())) {
                    return
                }

                if ((this.password.errors && this.password.errors['minLength']) || this.passConfirm.errors && this.passConfirm.errors['minLength']) {
                    return
                }
                
                this.password.setErrors(null);
                this.passConfirm.setErrors(null);
                this.passwordMissmatch = false;
                subscription?.unsubscribe;
            });
            return;
        }

        if (this.registrationForm.valid) {
            let registrationRequest : RegistrationRequest = {
                email: this.email.value.trim(),
                password: this.password.value.trim(),
                passConfirm: this.passConfirm.value.trim(),
                name: this.name.value.trim(),
                surname: this.surname.value.trim(),
                phone: this.phone.value.trim(),
                country: this.country.value.trim(),
                city: this.city.value.trim(),
                street: this.city.value.trim(),
                postCode: this.postCode.value.trim(),
            }

            this.registrationService.registerEmployee(registrationRequest).subscribe((res: boolean) => {
                if (res) {
                    this.router.navigate(['/admin/employee']);
                }
            });
        }
    }

    get email() {
        return this.registrationForm.get('email')!;
    }

    get password() {
        return this.registrationForm.get('passwordsInput.password')!;
    }

    get passConfirm() {
        return this.registrationForm.get('passwordsInput.passConfirm')!;
    }

    get name() {
        return this.registrationForm.get('contactInfo.name')!;
    }

    get surname() {
        return this.registrationForm.get('contactInfo.surname')!;
    }

    get phone() {
        return this.registrationForm.get('contactInfo.phone')!;
    }

    get country() {
        return this.registrationForm.get('adress.country')!;
    }

    get city() {
        return this.registrationForm.get('adress.city')!;
    }

    get street() {
        return this.registrationForm.get('adress.street')!;
    }

    get postCode() {
        return this.registrationForm.get('adress.postCode')!;
    }
}