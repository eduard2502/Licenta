import { Component }               from '@angular/core';
import { CommonModule }            from '@angular/common';
import { RouterModule, Router }    from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MatCardModule }           from '@angular/material/card';
import { MatFormFieldModule }      from '@angular/material/form-field';
import { MatInputModule }          from '@angular/material/input';
import { MatButtonModule }         from '@angular/material/button';

import { AuthService }             from '../auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  form: FormGroup;
  error = '';

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {
    // Inițializez formularul aici, după ce fb a fost injectat
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  submit() {
    if (this.form.invalid) return;
    const { username, password } = this.form.value;
    if (this.auth.login(username, password)) {
      const dest = this.auth.role === 'admin' ? '/produse' : '/user';
      this.router.navigateByUrl(dest);
    } else {
      this.error = 'Credentiale invalide';
    }
  }
}
