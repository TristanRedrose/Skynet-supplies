import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { FormArray, FormControl, FormGroup, Validators } from "@angular/forms";
import { Category, SubCategory } from "src/app/models/categories/category.models";
import { CategoryFormFactory } from "src/app/services/factories/category-form-factory";

@Component({
    selector: 'category-form',
    templateUrl: './categoryForm.component.html',
    styleUrls: ['./categoryForm.component.scss']
})

export class CategoryFormComponent implements OnInit {
    categoryForm!:FormGroup;
    @Output() newSubmitEvent = new EventEmitter<Category>();

    constructor(private categoryFormFactory: CategoryFormFactory) {}

    ngOnInit(): void {
        this.categoryForm = this.categoryFormFactory.categoryForm();
    }

    get subCategories(): FormArray {
        return this.categoryForm.get('subCategory') as FormArray;
    }

    addSubCategory() {
        this.subCategories.push(new FormControl('', Validators.required));
    }
    
    removeSubCategory(index: number) {
        this.subCategories.removeAt(index);
    }

    getSubmitedData(): Category {
        const submitedData: Category = {
            name: this.categoryForm.get('category')?.value,
            subCategories: [],
        }

        console.log(submitedData)

        this.subCategories.controls.forEach((element) => {
            const subCategory: SubCategory = {
                name: element.value,
                products: [],
            }
            submitedData.subCategories.push(subCategory);
        })

        return submitedData;

    }

    onSubmit() {
        const categoryData = this.getSubmitedData();
        if (categoryData) {
            this.newSubmitEvent.emit(categoryData);
        }
    }
}