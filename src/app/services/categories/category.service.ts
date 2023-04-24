import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { catchError, map, Observable, throwError } from "rxjs";
import { Category } from "src/app/models/categories/category.models";
import { CreateCategoryRequest } from "src/app/models/categories/createCategoryRequest.models";
import { UpdateCategoryRequest } from "src/app/models/categories/updateCategory.request";


@Injectable ({
    providedIn: 'root'
})

export class CategoryService {

    constructor(private http: HttpClient) {}

    addCategory(categoryData: CreateCategoryRequest): Observable<void> {
        return this.http.post<void>('https://localhost:7046/Category/', categoryData);
    }

    getAllCategories(): Observable<Category[]> {
        return this.http.get<Category[]>('https://localhost:7046/Category').pipe(
            map((res: Category[]) => {
                return res;
            }),
            catchError((error: HttpErrorResponse) => {
                let errorMessage= '';
                if (error.error instanceof ErrorEvent) {
                    errorMessage = `Error ${error.error.message}`;
                }
                 else {
                    errorMessage = `Error code ${error.status}; message: ${error}`;
                }
                return throwError(() => new Error(errorMessage));
            }));
    }

    deleteCategory(id: string): Observable<void> {
        return this.http.delete<void>(`https://localhost:7046/Category/${id}`);
    }

    getCategory(id: string): Observable<Category> {
        return this.http.get<Category>(`https://localhost:7046/Category/${id}`);
    }

    updateCategory(updateCategoryRequest: UpdateCategoryRequest, id: string): Observable<void> {
        return this.http.patch<void>(`https://localhost:7046/Category/${id}`, updateCategoryRequest);
    }
}