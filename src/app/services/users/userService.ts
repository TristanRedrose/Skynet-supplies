import { Injectable } from "@angular/core";
import { User, UserDetails } from "src/app/models/users/user";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { catchError, map, Observable, throwError } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})

export class UserService {

    rootUrl: string = `${environment.rootApiUrl}/User`;

    constructor(private http: HttpClient){}

    getAllEmployees(): Observable<User[]>{
        return this.http.get<User[]>(`${this.rootUrl}/Employee`).pipe(
            map((res: User[]) => {
                return res
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

    getAllCustomers(): Observable<User[]>{
        return this.http.get<User[]>(`${this.rootUrl}/Customer`).pipe(
            map((res: User[]) => {
                return res
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

    deleteUser(id: string): Observable<void> {
        return this.http.delete<void>(`${this.rootUrl}/${id}`);
    }

    getUserData(id: string): Observable<UserDetails> {
        return this.http.get<UserDetails>(`${this.rootUrl}/${id}`).pipe(
            map((res: UserDetails) => {
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

    updateUser(userData: UserDetails): Observable<void> {
        return this.http.patch<void>(`${this.rootUrl}`, userData);
    }
}