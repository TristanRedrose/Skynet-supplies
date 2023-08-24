import { Injectable } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";

@Injectable({
    providedIn: 'root'
})

export class UserFormFactory {
    
    constructor() {}

    userDataForm(): FormGroup {
        return new FormGroup({
            email: new FormControl(null, [Validators.email, Validators.required]),
            name: new FormControl(null, Validators.required),
            surname: new FormControl(null, Validators.required),
            phone: new FormControl(null, Validators.required),
            country: new FormControl(null, Validators.required),
            city: new FormControl(null, Validators.required),
            street: new FormControl(null, Validators.required),
            postCode: new FormControl(null, Validators.required),       
        });
    }
}