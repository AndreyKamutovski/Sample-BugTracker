import { CommonModule } from '@angular/common';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { NavbarComponent } from './navbar.component';
import { AngularMaterialDesignModule } from '../angular-material-design/angular-material-design.module';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    AngularMaterialDesignModule,
    RouterModule,
    
  ],
  declarations: [NavbarComponent],
  exports: [NavbarComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class NavbarModule { }
