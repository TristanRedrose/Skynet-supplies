import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { SessionService } from '../services/auth/session.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeeGuard implements CanActivate {

  constructor(private sessionService: SessionService, private router: Router) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    this.sessionService.checkSession();
    
    if (!this.sessionService.role){
      this.router.navigate(['auth/login']);
      return false;
    }

    const validRoles: string[] = ["Employee"];

    if (validRoles.includes(this.sessionService.role)) {
      return true;
    }

    this.router.navigate(['']);
    return false;
  }

}