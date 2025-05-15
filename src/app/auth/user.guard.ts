// src/app/auth/user.guard.ts
import { Injectable }     from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { AuthService }    from './auth.service';

@Injectable({ providedIn: 'root' })
export class UserGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

 canActivate(): boolean | UrlTree {
  if (!this.auth.isLoggedIn) {
    return this.router.createUrlTree(['/login']);
  }
  if (this.auth.role !== 'user') {
    // dacă nu eşti user, nu ai voie aici
    return this.router.createUrlTree(['/login']);
  }
  return true;
}
}
