// src/app/shared/material.module.ts
import { NgModule }             from '@angular/core';
import { MatToolbarModule }     from '@angular/material/toolbar';
import { MatSidenavModule }     from '@angular/material/sidenav';
import { MatListModule }        from '@angular/material/list';
import { MatButtonModule }      from '@angular/material/button';
import { MatIconModule }        from '@angular/material/icon';
import { MatCardModule }        from '@angular/material/card';
import { MatFormFieldModule }   from '@angular/material/form-field';
import { MatInputModule }       from '@angular/material/input';

@NgModule({
  exports: [
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule
  ]
})
export class MaterialModule {}
