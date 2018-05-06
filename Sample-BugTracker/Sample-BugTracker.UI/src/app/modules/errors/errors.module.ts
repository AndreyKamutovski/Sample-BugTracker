import { NgModule } from '@angular/core';
import { TableModule } from 'primeng/table';

import { SharedModule } from './../shared/shared.module';
import { AddErrorFormComponent } from './components/add-error-form/add-error-form.component';
import { ErrorListComponent } from './components/error-list/error-list.component';
import { SelectedErrorDialogComponent } from './components/selected-error-dialog/selected-error-dialog.component';
import { SolutionErrorFormComponent } from './components/solution-error-form/solution-error-form.component';
import { ErrorListResolverService } from './resolvers/error-list-resolver.service';
import { ErrorListSharedService } from './services/error-list-shared.service';
import { ErrorService } from './services/error.service';


@NgModule({
  imports: [
    SharedModule,
    TableModule
  ],
  declarations: [
    ErrorListComponent,
    AddErrorFormComponent,
    SelectedErrorDialogComponent,
    SolutionErrorFormComponent
  ],
  entryComponents: [
    AddErrorFormComponent,
    SelectedErrorDialogComponent,
    SolutionErrorFormComponent
  ],
  providers: [
    ErrorService,
    ErrorListResolverService,
    ErrorListSharedService
  ]
})
export class ErrorsModule { }
