import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const currentUser = this.authService.getCurrentUser();
    if (currentUser) {
      if (next.data['role'] && next.data['role'] !== currentUser.role) {
        // Role not authorized, redirect to home page
        this.router.navigate(['/']);
        return false;
      }
      // Authorized so return true
      return true;
    }

    // Not logged in so redirect to login page with the return URL
    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
    return false;
  }
}
