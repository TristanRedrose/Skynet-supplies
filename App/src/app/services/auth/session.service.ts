import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { AuthResponse } from "src/app/models/auth/authResponse.types";
import { map,Observable, catchError, throwError, BehaviorSubject } from "rxjs";
import { Router } from "@angular/router";
import { Session } from "../../models/session/session.types"
import { LoginRequest } from "src/app/models/auth/authRequest.types";
import { environment } from "src/environments/environment";

@Injectable ({
    providedIn: 'root'
})

export class SessionService {

    private _userLoggedIn = new BehaviorSubject(false);
    userLoggedIn$ = this._userLoggedIn.asObservable();
    rootUrl: string = `${environment.rootApiUrl}/Auth`;

    private _session: Session = {
        token: null,
        username: null,
        validTo: null,
        role: null,
    }

    // Typescript issue with NodeJS.Timeout type
    private _sessionTimer: any;
    
    constructor( private http: HttpClient, private router: Router) {}

    setSession(session:Session): void {
        this._session = session;
        localStorage.setItem('currentSession', JSON.stringify(session));
        this.setSessionTimer();
        this._userLoggedIn.next(true);
    }
    
    logIn(LoginRequest: LoginRequest): Observable<void>  {
        return this.http.post<AuthResponse>(`${this.rootUrl}/Login`, LoginRequest).pipe(map((res: AuthResponse) => {
            const session = {
                token: res.token,
                username: res.username,
                validTo: res.expireDate,
                role: res.role,
            }
            this.setSession(session);
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
        
    };

    clearSession() {
        this._session = {
            token: null,
            username: null,
            validTo: null,
            role: null,
        }
        localStorage.removeItem('currentSession');
        this._userLoggedIn.next(false);
    }

    logOut(): void {
        this.clearSession();
        clearTimeout(this._sessionTimer);
        console.log("logged out");
        this.router.navigate(["/auth/login"]);
    };

    userLoggedIn(): Observable<boolean> {
        return this._userLoggedIn;
    }

    setSessionTimer(): void {
        clearTimeout(this._sessionTimer);
        let timer: number = (Date.parse(this.session.validTo!) - (Math.floor(Date.now()))) / 1000;
        console.log(timer)
        this._sessionTimer = setTimeout(() => (this.logOut()), timer);
    }

    checkSession(): void {
        const sessionString = localStorage.getItem("currentSession");
        if (sessionString) {
            const session: Session = JSON.parse(sessionString);
            if ((Math.floor(Date.now())) < (Date.parse(session.validTo!))) {
                this.setSession(session);
            }
        }
    }
    
    get session(): Session {
        return this._session;
    }

    get token(): string | null {
        return this._session.token;
    }

    get username(): string | null {
        return this._session.username;
    }

    get role(): string | null {
        return this._session.role;
    }
}
