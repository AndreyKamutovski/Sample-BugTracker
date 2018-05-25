import { NgModule } from '@angular/core';
import { TableModule } from 'primeng/table';

import { SharedModule } from './../shared/shared.module';
import { AddErrorFormComponent } from './components/add-error-form/add-error-form.component';
import { ErrorListComponent } from './components/error-list/error-list.component';
import { SelectedErrorDialogComponent } from './components/selected-error-dialog/selected-error-dialog.component';
import { ErrorListResolverService } from './resolvers/error-list-resolver.service';
import { ErrorListSharedService } from './services/error-list-shared.service';
import { ErrorService } from './services/error.service';
import { StatusSelectItems } from './services/selection-lists-items/status-select-items';
import { PrioritySelectItems } from './services/selection-lists-items/priority-select-items';
import { ClassificationSelectItems } from './services/selection-lists-items/classification-select-items';
import {FileUploadModule} from 'primeng/fileupload';
import { ErrorAttachmentsComponent } from './components/error-attachments/error-attachments.component';
import { ConfirmAttachmentDeleteComponent } from './components/confirm-attachment-delete/confirm-attachment-delete.component';
import { ErrorRoutingModule } from './error-routing.module';
import { ErrorSolutionFormComponent } from './components/error-solution-form/error-solution-form.component';
import { SolutionComponent } from './components/solution/solution.component';
import { StatusSelectComponent } from './components/status-select/status-select.component';
import { ErrorSolutionService } from './services/error-solution.service';
import { AttachmentsComponent } from './components/attachments/attachments.component';
import { SolutionAttachmentService } from './services/solution-attachment.service';
import { AttachmentPreviewService } from './services/attachment-preview.service';
import { UpdateSolutionFormComponent } from './components/update-solution-form/update-solution-form.component';

@NgModule({
  imports: [
    SharedModule,
    TableModule,
    FileUploadModule,
    ErrorRoutingModule
  ],
  declarations: [
    ErrorListComponent,
    AddErrorFormComponent,
    SelectedErrorDialogComponent,
    ErrorSolutionFormComponent,
    ErrorAttachmentsComponent,
    ConfirmAttachmentDeleteComponent,
    SolutionComponent,
    StatusSelectComponent,
    AttachmentsComponent,
    UpdateSolutionFormComponent,
  ],
  entryComponents: [
    AddErrorFormComponent,
    SelectedErrorDialogComponent,
    ErrorSolutionFormComponent,
    ConfirmAttachmentDeleteComponent,
    UpdateSolutionFormComponent
  ],
  providers: [
    ErrorService,
    ErrorSolutionService,
    ErrorListResolverService,
    ErrorListSharedService,
    StatusSelectItems,
    PrioritySelectItems,
    ClassificationSelectItems,
    SolutionAttachmentService,
    AttachmentPreviewService
  ]
})
export class ErrorsModule { }
