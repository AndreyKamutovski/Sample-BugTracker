import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { ImageUploadModule } from 'angular2-image-upload';

import { ErrorAttachmentService } from '../errors/services/error-attachment.service';
import { SharedModule } from './../shared/shared.module';
import { NavbarComponent } from './components/navbar/navbar.component';
import { UploadUserPhotoFormComponent } from './components/upload-user-photo-form/upload-user-photo-form.component';

@NgModule({
  imports: [
    SharedModule,
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
    // UsersService,
    ErrorAttachmentService
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NavbarModule { }
