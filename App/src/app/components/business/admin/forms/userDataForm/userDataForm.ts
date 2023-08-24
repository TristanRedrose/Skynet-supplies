import { Component, Input, OnInit, Output, EventEmitter } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { UserDetails } from "src/app/models/users/user";
import { UserFormFactory } from "src/app/services/factories/user-form-factory";
import { UserService } from "src/app/services/users/userService";


@Component({
    selector: 'user-data-form',
    templateUrl: './userDataForm.html',
    styleUrls: ['./userDataForm.scss']
})

export class UserDataForm implements OnInit {

    id : string = "";
    userDataForm!: FormGroup;
    passwordMissmatch: boolean = false;
    @Output() newSubmitEvent = new EventEmitter<UserDetails>();
    @Input() userFormData: UserDetails | undefined;

    constructor(private userFormFactory: UserFormFactory,
        private userService: UserService
        ) {};
    
    ngOnInit(): void {
        this.userDataForm = this.userFormFactory.userDataForm();

        if (this.userFormData) {
            const {id, email, name, surname, street, country, postCode, phone, city } = this.userFormData;
            this.id = id;

            console.log(name);

            this.userDataForm.patchValue({
                email: email,
                name: name,
                surname : surname,
                phone : phone,
                street: street,
                country: country,
                postCode : postCode,
                city : city,
            });
        }
    }


    getSubmitedData(): UserDetails {
        const submitedData : UserDetails= {
            id: this.id,
            email: this.email.value.trim(),
            name: this.name.value.trim(),
            surname: this.surname.value.trim(),
            phone: this.phone.value.trim(),
            country: this.country.value.trim(),
            city: this.city.value.trim(),
            street: this.street.value.trim(),
            postCode: this.postCode.value.trim(),
        }

        return submitedData;
    }

    onSubmit() {
        const userData = this.getSubmitedData();
        if (userData) {
            this.newSubmitEvent.emit(userData);
        }
    }

    get email() {
        return this.userDataForm.controls['email'];
    }

    get name() {
        return this.userDataForm.controls['name'];
    }

    get surname() {
        return this.userDataForm.controls['surname'];
    }

    get phone() {
        return this.userDataForm.controls['phone'];
    }

    get country() {
        return this.userDataForm.controls['country'];
    }

    get city() {
        return this.userDataForm.controls['city'];
    }

    get street() {
        return this.userDataForm.controls['street'];
    }

    get postCode() {
        return this.userDataForm.controls['postCode'];
    }
}