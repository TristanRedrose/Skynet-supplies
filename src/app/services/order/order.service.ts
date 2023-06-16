import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core"
import { Observable, catchError, map, throwError } from "rxjs";
import { OrderDetails } from "src/app/models/order/orderDetails.type";
import { OrderRequest } from "src/app/models/order/orderRequest.type";
import { OrderResponse } from "src/app/models/order/orderResponse.types";

@Injectable({
    providedIn: 'root',
})

export class OrderService {

    constructor(
        private http: HttpClient,
    ) {}

    getAllOrders(): Observable<OrderResponse> {
        return this.http.get<OrderResponse>('https://localhost:7046/Order').pipe(
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
        return this.http.post<void>('https://localhost:7046/Order', orderRequest).pipe(
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
        return this.http.delete<void>(`https://localhost:7046/Order/${id}`);
    }

    getOrderById(id:string): Observable<OrderDetails> {
        return this.http.get<OrderDetails>(`https://localhost:7046/Order/${id}`).pipe(
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