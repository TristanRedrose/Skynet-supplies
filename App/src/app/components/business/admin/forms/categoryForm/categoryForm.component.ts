import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormArray, FormControl, FormGroup, Validators } from "@angular/forms";
import { Category } from "src/app/models/categories/category.models";
import { CreateCategoryRequest, SubCategoryRequest } from "src/app/models/categories/createCategoryRequest.models";
import { CategoryFormFactory } from "src/app/services/factories/category-form-factory";

@Component({
    selector: 'category-form',
    templateUrl: './categoryForm.component.html',
    styleUrls: ['./categoryForm.component.scss']
})

export class CategoryFormComponent implements OnInit {
    categoryForm!:FormGroup;
    @Output() newSubmitEvent = new EventEmitter<CreateCategoryRequest>();
    @Input() categoryFormData: Category | undefined;

    constructor(private categoryFormFactory: CategoryFormFactory) {}

    ngOnInit(): void {
        this.categoryForm = this.categoryFormFactory.categoryForm();

        if (this.categoryFormData) {
            const { name, subcategories } = this.categoryFormData

            this.categoryForm.patchValue({
                category: name,
            })
            console.log(subcategories)
            subcategories.forEach((element, index) => {
                if (index === 0) {
                    this.subCategories.controls[index].patchValue(element.name);
                } else {
                    this.subCategories.push(new FormControl(`${element.name}`, Validators.required));
                }
            });
        }
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

    getSubmitedData(): CreateCategoryRequest {
        const submitedData: CreateCategoryRequest = {
            name: this.categoryForm.get('category')?.value,
            subCategories: [],
        }

        this.subCategories.controls.forEach((element) => {
            const subCategory: SubCategoryRequest = {
                name: element.value,
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