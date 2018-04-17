import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material';

import { SharedModule } from './../shared/shared.module';
import { LoaderComponent } from './loader.component';
import { LoaderService } from './loader.service';

@NgModule({
  imports: [
    SharedModule,
    MatProgressSpinnerModule
  ],
  declarations: [LoaderComponent],
  exports: [LoaderComponent],
  providers: [LoaderService],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class LoaderModule { }
