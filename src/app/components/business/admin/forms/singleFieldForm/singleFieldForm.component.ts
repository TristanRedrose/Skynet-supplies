import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import {FormGroup} from "@angular/forms";
import { CategoryFormFactory } from "src/app/services/factories/category-form-factory";

@Component({
    selector: 'single-field-form',
    templateUrl: './singleFieldForm.component.html',
    styleUrls: ['./singleFieldForm.component.scss']
})

export class SingleFieldFormComponent implements OnInit {
    nameEditForm!:FormGroup;
    @Output() newSubmitEvent = new EventEmitter<string>();
    @Input() originalData: string | undefined;

    constructor(private categoryFormFactory: CategoryFormFactory) {}

    ngOnInit(): void {
        this.nameEditForm = this.categoryFormFactory.editNameForm();

        if (this.originalData) {
            this.nameEditForm.patchValue({
                name: this.originalData,
            })
        }
    }

    onSubmit() {
        this.newSubmitEvent.emit(this.nameEditForm.controls['name'].value);
    }
}