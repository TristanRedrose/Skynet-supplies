import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { SubCategory } from "src/app/models/categories/category.models";

@Component({
    selector: 'editSubcategory-component',
    templateUrl: './editSubcategory.html',
    styleUrls: ['./editSubcategory.scss'],
})

export class EditSubcategoryComponent implements OnInit {

    id: string = '';
    subcategoryData!: SubCategory;

    constructor(
            private route: ActivatedRoute
        ) {}

    ngOnInit(): void {
        this.route.queryParams.subscribe(params => {
            this.id = params['id'];
        })
    }
}