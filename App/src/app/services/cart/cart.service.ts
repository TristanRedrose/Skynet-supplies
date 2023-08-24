import { HttpClient, HttpErrorResponse, HttpParams } from "@angular/common/http";
import { Injectable, OnInit } from "@angular/core";
import { BehaviorSubject, Observable, catchError, map, throwError } from "rxjs";
import { CartResponse } from "src/app/models/cart/cart.types";
import { ProductOrder } from "src/app/models/order/productOrder.type";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})

export class CartService {
    private cartItemCountSubject = new BehaviorSubject<number>(0);
    cartItemCountSubject$ = this.cartItemCountSubject.asObservable();
    cartStorageName: string = 'cart';
    rootUrl: string = `${environment.rootApiUrl}/Order`;

    constructor(
        private http: HttpClient,
    ) {
        this.checkCartItemCount();
    }

    checkCartItemCount():void {
        let cartItemCount: number = 0;

        const cart = this.cart;
        cart.forEach(item => {
            cartItemCount += item.quantity;
        })

        this.setCartItemCount(cartItemCount);
    }

    addProductToCart(newCartItem: ProductOrder):void {
        let cart = this.cart;

        const existingItem = cart.find(item => item.productId === newCartItem.productId);

        if (existingItem) {
            existingItem.quantity += newCartItem.quantity;
        } else {
            cart.push(newCartItem);
        }

        this.setCartItemCount(this.cartItemCount + newCartItem.quantity);

        localStorage.setItem(this.cartStorageName, JSON.stringify(cart));
    }

    removeProductFromCart(productId: number, productQuantity: number):void {
        if (!this.cartItemCount) {
            return;
        }
        
        let cart = this.cart;

        const newCart = cart.filter(item => item.productId !== productId);

        this.setCartItemCount(this.cartItemCount - productQuantity);

        localStorage.setItem(this.cartStorageName, JSON.stringify(newCart));
    }

    getProductsInCart(): Observable<CartResponse> {
        return this.http.post<CartResponse>(`${this.rootUrl}/Cart`, this.cart ).pipe(
            map((res: CartResponse) => {
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

    clearCart(): void {
        localStorage.removeItem(this.cartStorageName);
        this.setCartItemCount(0);
    }

    setCartItemCount(newCount: number) {
        this.cartItemCountSubject.next(newCount);
    }

    get cartItemCount(): number {
        return this.cartItemCountSubject.value;
    }

    get cart(): ProductOrder[] {
        const cartString = this.cartString

        if (!cartString) {
            return [];
        }

        const cart: ProductOrder[] = JSON.parse(cartString);
        return cart;
    }

    get cartString(): string | null {
        return localStorage.getItem(this.cartStorageName);
    }
}