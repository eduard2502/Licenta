// src/app/auth/auth.service.ts
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser }             from '@angular/common';
import { Router }                        from '@angular/router';

export type Role = 'admin' | 'user';

interface User {
  username: string;
  password: string;
  role: Role;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private users: User[] = [
    { username: 'admin', password: 'admin123', role: 'admin' },
    { username: 'user',  password: 'user123',  role: 'user'  }
  ];
  private current?: User;

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    // La inițializare, restabilește userul din sessionStorage doar în browser:
    if (isPlatformBrowser(this.platformId)) {
      const saved = sessionStorage.getItem('currentUser');
      if (saved) {
        this.current = JSON.parse(saved);
      }
    }
  }

  login(username: string, password: string): boolean {
    const user = this.users.find(u => u.username === username && u.password === password);
    if (!user) {
      return false;
    }
    this.current = user;
    if (isPlatformBrowser(this.platformId)) {
      sessionStorage.setItem('currentUser', JSON.stringify(user));
    }
    return true;
  }

  logout(): void {
    this.current = undefined;
    if (isPlatformBrowser(this.platformId)) {
      sessionStorage.removeItem('currentUser');
    }
    this.router.navigate(['/login']);
  }

  get isLoggedIn(): boolean {
    // evităm sessionStorage pe server
    if (isPlatformBrowser(this.platformId)) {
      if (!this.current) {
        const saved = sessionStorage.getItem('currentUser');
        if (saved) {
          this.current = JSON.parse(saved);
        }
      }
      return !!this.current;
    }
    return false;
  }

  get role(): Role | undefined {
    return this.current?.role;
  }
}
