// src/app/features/products/products.module.ts
import { NgModule }            from '@angular/core';
import { CommonModule }        from '@angular/common';
import { RouterModule }        from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { ProductListComponent }   from './product-list/product-list.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductFormComponent }   from './product-form/product-form.component';

@NgModule({
  // elimină complet `declarations`
  imports: [
    CommonModule,
    RouterModule,            // pentru directivele routerLink, outlet etc.
    ReactiveFormsModule,

    // importă aici componentele standalone
    ProductListComponent,
    ProductDetailComponent,
    ProductFormComponent
  ]
})
export class ProductsModule {}
