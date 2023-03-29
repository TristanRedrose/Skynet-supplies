import { Injectable } from "@angular/core";
import { User, UserDetails } from "src/app/models/users/user";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { catchError, map, Observable, throwError } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class UserService {

    constructor(private http: HttpClient){}

    getAllEmployees(): Observable<User[]>{
        return this.http.get<User[]>("https://localhost:7046/User/Employee").pipe(
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
        return this.http.delete<void>(`https://localhost:7046/User/${id}`);
    }

    getUserData(id: string): Observable<UserDetails> {
        return this.http.get<UserDetails>(`https://localhost:7046/User/${id}`).pipe(
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
        return this.http.patch<void>(`https://localhost:7046/User`, userData);
    }
}