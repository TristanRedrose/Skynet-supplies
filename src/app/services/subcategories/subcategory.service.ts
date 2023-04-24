import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root',
})

export class SubcategoryService {

    constructor(private http: HttpClient) {}

    deleteSubcategory(id: string): Observable<void> {
        return this.http.delete<void>(`https://localhost:7046/SubCategory/${id}`);
    }
}