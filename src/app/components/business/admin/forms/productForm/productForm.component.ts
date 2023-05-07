import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { AbstractControl, FormGroup } from "@angular/forms";
import { finalize } from "rxjs";
import { Category, SubCategory } from "src/app/models/categories/category.models";
import { Product } from "src/app/models/products/product.type";
import { ProductRequest } from "src/app/models/products/productRequest.type";
import { CategoryService } from "src/app/services/categories/category.service";
import { ProductFormFactory } from "src/app/services/factories/product-form-factory.service";
import { LoadingService } from "src/app/services/loading/loading.service";


@Component({
    selector: 'product-form-component',
    templateUrl: './productForm.component.html',
    styleUrls: ['./productForm.component.scss']
})

export class ProductFormComponent implements OnInit {

    id: string = "";
    productForm!: FormGroup;
    @Input() categories: Category[] | null = null;
    subcategories: SubCategory[] | null = null;
    @Output() newSubmitEvent = new EventEmitter<ProductRequest>();
    @Input() productData : Product | null = null

    constructor( 
            private productFormFactory: ProductFormFactory,
        ) {}

    ngOnInit(): void {
        this.productForm = this.productFormFactory.productDataForm();

        if (this.productData && this.categories) {
            const {subcategoryId, name, price, description, available} = this.productData;

            const productCategory = this.categories.find(category => category.subcategories.some(subcategory => subcategory.subcategoryId === subcategoryId));

            if (!productCategory) {
                return
            }

            this.categoryControl.patchValue(productCategory.categoryId);

            this.onCategorySelected();

            this.subcategoryControl.patchValue(subcategoryId);
            this.nameControl.patchValue(name);
            this.priceControl.patchValue(price),
            this.descriptionControl.patchValue(description);
            this.availableControl.patchValue(available);      
        }
   
    }

    onCategorySelected(): void {
        this.subcategoryControl.setValue(null);

        if (this.categories) {
            const category = this.categories.find(category => category.categoryId == this.categoryControl.value)

            if (category) {
                this.subcategories = category.subcategories;

                if (this.subcategoryControl.disabled) {
                    this.subcategoryControl.enable();
                }
            }
        }
    }

    onSubmit(): void {

        if (this.productForm.invalid) {
            return
        }

        const productRequest: ProductRequest = {
            subcategoryId: this.subcategoryControl.value,
            name: this.nameControl.value,
            description: this.descriptionControl.value,
            price: this.priceControl.value,
            available: this.availableControl.value,
        }

        this.newSubmitEvent.emit(productRequest);
    }

    get categoryControl(): AbstractControl {
        return this.productForm.controls['category'];
    }

    get subcategoryControl(): AbstractControl {
        return this.productForm.controls['subcategory'];
    }

    get nameControl(): AbstractControl {
        return this.productForm.controls['name'];
    }

    get descriptionControl(): AbstractControl {
        return this.productForm.controls['description'];
    }

    get priceControl(): AbstractControl {
        return this.productForm.controls['price'];
    }

    get availableControl(): AbstractControl {
        return this.productForm.controls['available'];
    }
}