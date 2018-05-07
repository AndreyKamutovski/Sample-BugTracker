import { NgModule } from '@angular/core';
import { TableModule } from 'primeng/table';

import { SharedModule } from './../shared/shared.module';
import { AddErrorFormComponent } from './components/add-error-form/add-error-form.component';
import { ErrorListComponent } from './components/error-list/error-list.component';
import { SelectedErrorDialogComponent } from './components/selected-error-dialog/selected-error-dialog.component';
import { ErroStatusSelectComponent } from './components/shared/erro-status-select/erro-status-select.component';
import { ErrorStatusSelectService } from './components/shared/erro-status-select/error-status-select.service';
import {
  ErrorClassificationSelectComponent,
} from './components/shared/error-classification-select/error-classification-select.component';
import {
  ErrorClassificationSelectService,
} from './components/shared/error-classification-select/error-classification-select.service';
import {
  ErrorDescriptionInputComponent,
} from './components/shared/error-description-input/error-description-input.component';
import { ErrorPrioritySelectComponent } from './components/shared/error-priority-select/error-priority-select.component';
import { ErrorPrioritySelectService } from './components/shared/error-priority-select/error-priority-select.service';
import { ErrorTitleInputComponent } from './components/shared/error-title-input/error-title-input.component';
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
    SolutionErrorFormComponent,
    ErrorTitleInputComponent,
    ErrorDescriptionInputComponent,
    ErrorPrioritySelectComponent,
    ErrorClassificationSelectComponent,
    ErroStatusSelectComponent
  ],
  entryComponents: [
    AddErrorFormComponent,
    SelectedErrorDialogComponent,
    SolutionErrorFormComponent
  ],
  providers: [
    ErrorService,
    ErrorListResolverService,
    ErrorListSharedService,
    ErrorStatusSelectService,
    ErrorClassificationSelectService,
    ErrorPrioritySelectService
  ]
})
export class ErrorsModule { }
