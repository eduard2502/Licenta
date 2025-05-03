// src/app/features/products/product-list/product-list.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule }      from '@angular/common';
import { RouterModule }      from '@angular/router';
import { MaterialModule }    from '../../../shared/material.module';

import { ProductService }    from '../product.service';
import { Product }           from '../../../shared/models/product.model';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    CommonModule,       // *ngIf, *ngFor, pipe-uri (currency)
    RouterModule,       // routerLink, routerLinkActive
    MaterialModule      // mat-card, mat-button, etc.
  ],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  produse: Product[] = [];
  constructor(private productService: ProductService) {}
  ngOnInit() {
    this.productService.getAll().subscribe(data => this.produse = data);
  }
  sterge(id: number) {
    this.productService.delete(id).subscribe(() => this.produse = this.produse.filter(p => p.id !== id));
  }
}
