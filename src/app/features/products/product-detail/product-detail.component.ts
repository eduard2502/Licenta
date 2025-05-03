// src/app/features/products/product-detail/product-detail.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule }      from '@angular/common';
import { RouterModule }      from '@angular/router';
import { MaterialModule }    from '../../../shared/material.module';
import { ActivatedRoute }    from '@angular/router';

import { ProductService }    from '../product.service';
import { Product }           from '../../../shared/models/product.model';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, MaterialModule],
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  product!: Product;
  constructor(
    private route: ActivatedRoute,
    private service: ProductService
  ) {}
  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.service.getById(id).subscribe(p => this.product = p);
  }
}
