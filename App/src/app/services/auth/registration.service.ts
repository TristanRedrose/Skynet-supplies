import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { RegistrationRequest } from "src/app/models/auth/authRequest.types";
import { AuthResponse } from "src/app/models/auth/authResponse.types";
import { catchError, map, Observable, throwError } from "rxjs";
import { SessionService } from "./session.service";
import { Session } from "../../models/session/session.types";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})

export class RegistrationService {

    rootUrl: string = `${environment.rootApiUrl}/Auth`;
    
    constructor(private http: HttpClient , private sessionService: SessionService) {}

    registerUser(request: RegistrationRequest): Observable<void> {
        return this.http.post<AuthResponse>(`${this.rootUrl}/Register`, request).pipe(
            map((res: AuthResponse) => {
                let session: Session = {
                    username: res.username,
                    token: res.token,
                    role: res.role,
                    validTo: res.expireDate,
                }

                this.sessionService.setSession(session);
            }),
            catchError((error: HttpErrorResponse) => {
                let errorMessage= '';
                if (error.error instanceof ErrorEvent) {
                    errorMessage = `Error ${error.error.message}`;
                }
                 else {
                    errorMessage = `Error code ${error.status}; message: ${error}`;
                }
                console.log(errorMessage);
                return throwError(() => new Error(errorMessage));
            }));
    }

    registerEmployee(request: RegistrationRequest): Observable<boolean> {
        return this.http.post<boolean>(`${this.rootUrl}/Register/Employee`, request).pipe(
            map((res: boolean) => {
                return res;
            }),
            catchError((error: HttpErrorResponse) => {
                let errorMessage= '';
                if (error.error instanceof ErrorEvent) {
                    errorMessage = `Error ${error.error.message}`;
                }
                return throwError(() => new Error(errorMessage));
            }));
    }

}