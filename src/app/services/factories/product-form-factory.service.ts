import { Injectable } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";

@Injectable({
    providedIn: 'root'
})

export class ProductFormFactory {
    
    constructor() {}

    productDataForm(): FormGroup {
        return new FormGroup({
            category: new FormControl(null, Validators.required),
            subcategory: new FormControl({value: null, disabled: true}, Validators.required),
            name: new FormControl(null, Validators.required),
            description: new FormControl(null, Validators.required),
            price: new FormControl(null, Validators.required),    
            available: new FormControl(null, Validators.required),
        });
    }
}