import { Component, OnInit } from "@angular/core";
import { AbstractControl, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { SearchFormFactory } from "src/app/services/factories/search-form-factory.service";

@Component({
    selector: 'search-bar',
    templateUrl: './search-bar.component.html',
    styleUrls: ['./search-bar.component.scss']
})

export class SearchBarComponent implements OnInit {
    searchForm!: FormGroup;

    constructor(
        private searchFormFactory: SearchFormFactory,
        private router: Router,
    ) {}

    ngOnInit(): void {
        this.searchForm = this.searchFormFactory.searchForm();
    }
    
    onSubmit(): void {
        if (this.searchForm.invalid) {
            return;
        }

        let searchTerm = this.searchTermControls.value;

        this.router.navigate(['/products'], {queryParams: {page: 1, itemsPerPage: 12, search: searchTerm}});
    }

    get searchTermControls(): AbstractControl {
        return this.searchForm.controls['searchTerm'];
    }
}