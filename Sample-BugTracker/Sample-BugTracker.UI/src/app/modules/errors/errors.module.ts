import { NgModule } from '@angular/core';

import { SharedModule } from './../shared/shared.module';
import { AddErrorFormComponent } from './components/add-error-form/add-error-form.component';
import { ErrorListComponent } from './components/error-list/error-list.component';
import { ErrorService } from './error.service';
import { ErrorListResolverService } from './resolvers/error-list-resolver.service';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    ErrorListComponent,
    AddErrorFormComponent
  ],
  entryComponents: [
    AddErrorFormComponent
  ],
  providers: [
    ErrorService,
    ErrorListResolverService
  ]
})
export class ErrorsModule { }
