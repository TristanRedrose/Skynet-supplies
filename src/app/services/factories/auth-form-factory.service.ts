import { Injectable } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";

@Injectable({
    providedIn: 'root'
})

export class AuthFormFactory {

    
    constructor() {}

    loginForm(): FormGroup {
        return new FormGroup({
            email: new FormControl(null, Validators.email),
            password: new FormControl(null, Validators.required),
        });  
    }

    registrationForm(): FormGroup {
        return new FormGroup({
            email: new FormControl(null, [Validators.email, Validators.required]),
            passwordsInput: new FormGroup ({
                password: new FormControl(null, [Validators.required, Validators.minLength(8)]),
                passConfirm: new FormControl(null, [Validators.required, Validators.minLength(8)]),
            }),
            contactInfo: new FormGroup ({
                name: new FormControl(null, Validators.required),
                surname: new FormControl(null, Validators.required),
                phone: new FormControl(null, Validators.required),
            }),
            adress: new FormGroup({
                country: new FormControl(null, Validators.required),
                city: new FormControl(null, Validators.required),
                street: new FormControl(null, Validators.required),
                postCode: new FormControl(null, Validators.required),
            })
        });
    }
}