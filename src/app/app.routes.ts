// src/app/app.routes.ts
import { Routes } from '@angular/router';

import { LoginComponent }          from './login/login.component';
import { UserDashboardComponent }  from './features/user-dashboard/user-dashboard.component';
import { ProductListComponent }    from './features/products/product-list/product-list.component';
import { ProductFormComponent }    from './features/products/product-form/product-form.component';
import { ProductDetailComponent }  from './features/products/product-detail/product-detail.component';
import { AdminDashboardComponent } from './features/admin-dashboard/admin-dashboard.component';

import { AuthGuard }   from './auth/auth.guard';
import { UserGuard }   from './auth/user.guard';
import { AdminGuard }  from './auth/admin.guard';

export const routes: Routes = [
  // 1. login liber
  { path: 'login', component: LoginComponent },

  // 2. dashboard user (rămâne înaintea wildcard-ului)
  {
    path: 'user',
    component: UserDashboardComponent,
    canActivate: [AuthGuard, UserGuard]
  },

  // 3. zona admin (produse etc.)
  {
    path: 'produse',
    component: AdminDashboardComponent,    // vezi mai jos cum tratezi children
    canActivate: [AuthGuard, AdminGuard],
    children: [
      { path: '',           component: ProductListComponent },
      { path: 'nou',        component: ProductFormComponent },
      { path: ':id',        component: ProductDetailComponent },
      { path: ':id/editeaza', component: ProductFormComponent },
    ]
  },

  // 4. redirect gol spre login (sau spre user/admin după sesiune, dacă vrei)
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  // 5. wildcard
  { path: '**', redirectTo: 'login' }
];
