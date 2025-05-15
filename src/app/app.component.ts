// src/app/app.component.ts
import { Component }     from '@angular/core';
import { RouterOutlet }  from '@angular/router';
import { MaterialModule } from './shared/material.module';
import { AuthService }    from './auth/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MaterialModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(public auth: AuthService) {}
}
