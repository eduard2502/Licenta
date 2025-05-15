// src/app/features/admin-dashboard/admin-dashboard.component.ts
import { Component }      from '@angular/core';
import { CommonModule }   from '@angular/common';
import { RouterModule }   from '@angular/router';
import { MaterialModule } from '../../shared/material.module';
import { AuthService }    from '../../auth/auth.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, MaterialModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent {
  constructor(public auth: AuthService) {}
}
