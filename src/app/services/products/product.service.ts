import { Injectable } from "@angular/core";
import { ProductRequest } from "src/app/models/products/productRequest.type";
import { Product } from "src/app/models/products/product.type";
import { HttpClient, HttpErrorResponse, HttpParams } from "@angular/common/http";
import { Observable, catchError, map, throwError } from "rxjs";
import { ProductResponse } from "src/app/models/products/productResponse.type";

@Injectable({
    providedIn: 'root',
})

export class ProductService {

    constructor(private http: HttpClient) {}

    addProduct(request: ProductRequest): Observable<void> {
        return this.http.post<void>('https://localhost:7046/Product', request);
    }

    getAllProducts(filters: HttpParams): Observable<ProductResponse> {
        
        return this.http.get<ProductResponse>('https://localhost:7046/Product', {params: filters} ).pipe(
            map((res: ProductResponse) => {
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

    deleteProduct(id: string): Observable<void> {
        return this.http.delete<void>(`https://localhost:7046/Product/${id}`);
    }

    getProduct(id: string): Observable<Product> {
        return this.http.get<Product>(`https://localhost:7046/Product/${id}`);
    }

    updateProduct(request: ProductRequest, id: string): Observable<void> {
        return this.http.patch<void>(`https://localhost:7046/Product/${id}`, request);
    }
}