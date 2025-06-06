// src/app/auth/admin.guard.ts
import { Injectable }     from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { AuthService }    from './auth.service';

@Injectable({ providedIn: 'root' })
export class AdminGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(): boolean | UrlTree {
    return this.auth.role === 'admin'
      ? true
      : this.router.createUrlTree(['/login']);
  }
}
