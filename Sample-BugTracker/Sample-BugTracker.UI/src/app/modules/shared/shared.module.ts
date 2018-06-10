import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ScrollToModule } from 'ng2-scroll-to-el';
import { QuillModule } from 'ngx-quill';

import { AngularMaterialDesignModule } from '../angular-material-design/angular-material-design.module';
import { WarningDialogComponent } from './components/warning-dialog/warning-dialog.component';
import { GetClassificationNamePipe } from './pipes/get-classification-name.pipe';
import { GetPriorityNamePipe } from './pipes/get-priority-name.pipe';
import { GetStatusNamePipe } from './pipes/get-status-name.pipe';
import { GetUserNameFromEmailPipe } from './pipes/get-user-name-from-email.pipe';
import { LocalDateFromUtcPipe } from './pipes/local-date-from-utc.pipe';
import { ViewRolePipe } from './pipes/view-role.pipe';
import { CurrentProjectResolver } from './resolvers/current-project-resolver.service';
import { ProjectOwnerResolver } from './resolvers/project-owner-resolver.service';
import { ProjectWorkersResolver } from './resolvers/project-workers-resolver.service';
import { UserListResolver } from './resolvers/user-list-resolver.service';
import { AuthService } from './services/auth.service';
import { HttpClientService } from './services/httpClient.service';
import { MessageService } from './services/message.service';
import { ProjectService } from './services/project.service';
import { StatisticsRoutingService } from './services/statistics-routing.service';
import { UsersService } from './services/users.service';
import { SelectedErrorDialogComponent } from '../errors/components/selected-error-dialog/selected-error-dialog.component';
import { ErrorsModule } from '../errors/errors.module';
import { ErrorListSharedService } from './services/error-list-shared.service';
import { SharedDataService } from './services/shared-data.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AngularMaterialDesignModule,
    RouterModule,
    QuillModule,
    ScrollToModule,
    
    ],
  declarations: [
    GetUserNameFromEmailPipe,
    GetStatusNamePipe,
    GetPriorityNamePipe,
    GetClassificationNamePipe,
    ViewRolePipe,
    LocalDateFromUtcPipe,
    WarningDialogComponent,
  ],
  entryComponents:[
    WarningDialogComponent,
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AngularMaterialDesignModule,
    RouterModule,
    QuillModule,
    GetUserNameFromEmailPipe,
    ViewRolePipe,
    LocalDateFromUtcPipe,
    ScrollToModule
  ],
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [
        AuthService,
        HttpClientService,
        MessageService,
        UsersService,
        ProjectService,
        StatisticsRoutingService,
        ErrorListSharedService,
        // resolvers
        ProjectOwnerResolver,
        CurrentProjectResolver,
        ProjectWorkersResolver,
        UserListResolver,
        SharedDataService
      ]
    };
  }
}
