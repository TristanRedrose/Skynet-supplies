import { Injectable } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";

@Injectable({
    providedIn: 'root'
})

export class SearchFormFactory {
    
    constructor() {}

    searchForm(): FormGroup {
        return new FormGroup({
            searchTerm: new FormControl(null, Validators.required),
        });
    }
}