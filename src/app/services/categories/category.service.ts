import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Category } from "src/app/models/categories/category.models";


@Injectable ({
    providedIn: 'root'
})

export class CategoryService {

    constructor(private http: HttpClient) {}

    addCategory(categoryData: Category): Observable<void> {
        return this.http.post<void>('https://localhost:7046/Category', categoryData);
    }
}