import { Injectable } from "@angular/core";
import { User } from "src/app/models/users/user";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { catchError, map, Observable, throwError } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class UserService {

    constructor(private http: HttpClient){}

    getAllEmployees(): Observable<User[]>{
        return this.http.get<User[]>("https://localhost:7046/User/Employee").pipe(
            map((res : User[]) => {
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
}