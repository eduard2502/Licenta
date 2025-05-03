// src/app/app.component.ts
import { Component }     from '@angular/core';
import { RouterModule }  from '@angular/router';
import { MaterialModule } from './shared/material.module';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterModule,    // aduce <router-outlet>, routerLink, routerLinkActive
    MaterialModule   // aduce toate modulele Angular Material
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  // Înlocuieşte metoda care arunca eroare cu o proprietate simplă:
  title = 'magazin-calculatoare';
}
