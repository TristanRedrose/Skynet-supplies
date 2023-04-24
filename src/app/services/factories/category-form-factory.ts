import { Injectable } from "@angular/core";
import { FormArray, FormControl, FormGroup, Validators } from "@angular/forms";

@Injectable({
    providedIn: 'root'
})

export class CategoryFormFactory {
    
    constructor() {}

    categoryForm(): FormGroup {
        return new FormGroup({
            category: new FormControl(null, Validators.required),
            subCategory: new FormArray([
                new FormControl('', Validators.required),
            ]),        
        });
    }
    

    editNameForm(): FormGroup {
        return new FormGroup({
            name: new FormControl(null, Validators.required),      
        });
    }
}