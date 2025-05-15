// src/app/features/user-dashboard/user-dashboard.component.ts
import { Component, OnInit }      from '@angular/core';
import { CommonModule }           from '@angular/common';
import { RouterModule }           from '@angular/router';

import { MatSidenavModule }       from '@angular/material/sidenav';
import { MatToolbarModule }       from '@angular/material/toolbar';
import { MatListModule }          from '@angular/material/list';
import { MatIconModule }          from '@angular/material/icon';
import { MatButtonModule }        from '@angular/material/button';
import { MatCardModule }          from '@angular/material/card';

import { AuthService }            from '../../auth/auth.service';
import { ProductService }         from '../products/product.service';
import { Product }                from '../../shared/models/product.model';

@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,

    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule
  ],
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss']
})
export class UserDashboardComponent implements OnInit {
  produseRecomandate: Product[] = [];

  constructor(
    public auth: AuthService,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.productService.getAll()
      .subscribe(list => this.produseRecomandate = list.slice(0, 4));
  }

  logout() {
    this.auth.logout();
  }
}
