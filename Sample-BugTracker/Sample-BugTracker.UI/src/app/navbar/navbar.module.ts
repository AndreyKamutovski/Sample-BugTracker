import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ImageUploadModule } from 'angular2-image-upload';

import { AngularMaterialDesignModule } from '../angular-material-design/angular-material-design.module';
import { UsersService } from '../projects/services/users.service';
import { NavbarComponent } from './navbar.component';
import { UploadUserPhotoFormComponent } from './upload-user-photo-form/upload-user-photo-form.component';

@NgModule({
  imports: [
    CommonModule,
    AngularMaterialDesignModule,
    RouterModule,
    ImageUploadModule.forRoot(),
  ],
  declarations: [
    NavbarComponent,
    UploadUserPhotoFormComponent,
  ],
  exports: [NavbarComponent],
  entryComponents: [
    UploadUserPhotoFormComponent
  ],
  providers: [
    UsersService
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NavbarModule { }
