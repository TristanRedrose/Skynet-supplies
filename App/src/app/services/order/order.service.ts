import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core"
import { Observable, catchError, map, throwError } from "rxjs";
import { OrderDetails } from "src/app/models/order/orderDetails.type";
import { OrderRequest } from "src/app/models/order/orderRequest.type";
import { OrderResponse } from "src/app/models/order/orderResponse.types";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root',
})

export class OrderService {

    rootUrl: string = `${environment.rootApiUrl}/Order`;

    constructor(
        private http: HttpClient,
    ) {}

    getAllOrders(): Observable<OrderResponse> {
        return this.http.get<OrderResponse>(`${this.rootUrl}`).pipe(
            map((res: OrderResponse) => {
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
            })
        );
    }

    placeOrder(orderRequest: OrderRequest): Observable<void> {
        return this.http.post<void>(`${this.rootUrl}`, orderRequest).pipe(
            catchError((error: HttpErrorResponse) => {
                let errorMessage= '';
                if (error.error instanceof ErrorEvent) {
                    errorMessage = `Error ${error.error.message}`;
                }
                 else {
                    errorMessage = `Error code ${error.status}; message: ${error}`;
                }
                return throwError(() => new Error(errorMessage));
            })
        );
    }

    deleteOrder(id: string): Observable<void> {
        return this.http.delete<void>(`${this.rootUrl}/${id}`);
    }

    getOrderById(id:string): Observable<OrderDetails> {
        return this.http.get<OrderDetails>(`${this.rootUrl}/${id}`).pipe(
            map((res: OrderDetails) => {
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
            })
        );
    }
}