import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { SubCategory } from "src/app/models/categories/category.models";
import { UpdateSubcategoryRequest } from "src/app/models/categories/updateCategory.request";

@Injectable({
    providedIn: 'root',
})

export class SubcategoryService {

    constructor(private http: HttpClient) {}

    deleteSubcategory(id: string): Observable<void> {
        return this.http.delete<void>(`https://localhost:7046/SubCategory/${id}`);
    }

    getSubcategoryData(id: string): Observable<SubCategory> {
        return this.http.get<SubCategory>(`https://localhost:7046/SubCategory/${id}`);
    }

    updateSubcategory(updateSubcategoryRequest: UpdateSubcategoryRequest, id: string): Observable<void> {
        return this.http.patch<void>(`https://localhost:7046/SubCategory/${id}`, updateSubcategoryRequest);
    }
}