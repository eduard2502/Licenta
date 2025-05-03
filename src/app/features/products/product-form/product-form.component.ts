// src/app/features/products/product-form/product-form.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule }      from '@angular/common';
import { RouterModule }      from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MaterialModule }    from '../../../shared/material.module';
import { ActivatedRoute, Router } from '@angular/router';

import { ProductService }    from '../product.service';
import { Product }           from '../../../shared/models/product.model';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,  // formGroup, formControlName
    MaterialModule
  ],
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {
  form!: FormGroup;
  editMode = false;
  private id?: number;
  constructor(
    private fb: FormBuilder,
    private service: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  ngOnInit() {
    this.form = this.fb.group({
      nume: ['', Validators.required],
      procesor: ['', Validators.required],
      memorie: [8, [Validators.required, Validators.min(1)]],
      stoc: [1, [Validators.required, Validators.min(0)]],
      pret: [0, [Validators.required, Validators.min(0)]],
      imagineUrl: ['']
    });
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.editMode = true;
        this.id = +params['id'];
        this.service.getById(this.id).subscribe(p => this.form.patchValue(p));
      }
    });
  }
  submit() {
    if (this.form.invalid) return;
    const product = this.form.value as Product;
    const obs = this.editMode
      ? this.service.update({ ...product, id: this.id! })
      : this.service.create(product);
    obs.subscribe(() => this.router.navigate(['/produse']));
  }
}
