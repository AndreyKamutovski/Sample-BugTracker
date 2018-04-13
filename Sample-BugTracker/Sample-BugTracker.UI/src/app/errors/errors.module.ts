import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorListComponent } from './error-list/error-list.component';
import { AddErrorFormComponent } from './add-error-form/add-error-form.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ErrorListComponent, AddErrorFormComponent]
})
export class ErrorsModule { }
