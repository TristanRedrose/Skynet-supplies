import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { catchError, Observable, throwError } from "rxjs";
import { SessionService } from "./session.service";

@Injectable()

export class AuthInterceptorService implements HttpInterceptor {

    constructor(private sessionService: SessionService, private router: Router){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.sessionService.checkSession();
        const token = this.sessionService.token;

        if (token){
            req = req.clone({
                setHeaders: {'Authorization': `Bearer ${token}`}
            });
        }

        return next.handle(req).pipe(
            catchError((err) => {
                if (err instanceof HttpErrorResponse) {
                    if (err.status === 401) {
                        this.router.navigateByUrl('/login');
                    }
                }
                return throwError(() => new Error(err));
            })
        )
    }

    
}