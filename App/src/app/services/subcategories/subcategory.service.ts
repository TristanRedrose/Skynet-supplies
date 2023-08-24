import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { SubCategory } from "src/app/models/categories/category.models";
import { UpdateSubcategoryRequest } from "src/app/models/categories/updateCategory.request";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root',
})

export class SubcategoryService {

    rootUrl: string = `${environment.rootApiUrl}/Subcategory`;

    constructor(private http: HttpClient) {}

    deleteSubcategory(id: string): Observable<void> {
        return this.http.delete<void>(`${this.rootUrl}/${id}`);
    }

    getSubcategoryData(id: string): Observable<SubCategory> {
        return this.http.get<SubCategory>(`${this.rootUrl}/${id}`);
    }

    updateSubcategory(updateSubcategoryRequest: UpdateSubcategoryRequest, id: string): Observable<void> {
        return this.http.patch<void>(`${this.rootUrl}/${id}`, updateSubcategoryRequest);
    }
}