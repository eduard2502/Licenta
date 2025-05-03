// src/app/app.routes.ts
import { Routes } from '@angular/router';

import { ProductListComponent }   from './features/products/product-list/product-list.component';
import { ProductDetailComponent } from './features/products/product-detail/product-detail.component';
import { ProductFormComponent }   from './features/products/product-form/product-form.component';
// importă aici şi celelalte componente: Cart, Orders, AdminDashboard etc.

export const routes: Routes = [
  { path: '',                       redirectTo: 'produse',      pathMatch: 'full' },
  { path: 'produse',                component: ProductListComponent },
  { path: 'produse/nou',            component: ProductFormComponent },
  { path: 'produse/:id/editeaza',   component: ProductFormComponent },
  { path: 'produse/:id',            component: ProductDetailComponent },
  { path: '**',                     redirectTo: 'produse' }
];
