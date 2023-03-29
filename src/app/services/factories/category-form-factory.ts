import { Injectable } from "@angular/core";
import { FormArray, FormControl, FormGroup, Validators } from "@angular/forms";

@Injectable({
    providedIn: 'root'
})

export class CategoryFormFactory {
    
    constructor() {}

    categoryForm(): FormGroup {
        return new FormGroup({
            category: new FormControl(null, [Validators.email, Validators.required]),
            subCategory: new FormArray([
                new FormControl('', Validators.required),
            ]),        
        });
    }
    
}