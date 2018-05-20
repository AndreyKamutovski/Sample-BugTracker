import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { QuillModule } from 'ngx-quill';

import { AngularMaterialDesignModule } from './../angular-material-design/angular-material-design.module';
import { GetClassificationNamePipe } from './pipes/get-classification-name.pipe';
import { GetPriorityNamePipe } from './pipes/get-priority-name.pipe';
import { GetStatusNamePipe } from './pipes/get-status-name.pipe';
import { GetUserNameFromEmailPipe } from './pipes/get-user-name-from-email.pipe';
import { ViewRolePipe } from './pipes/view-role.pipe';
import { AuthService } from './services/auth.service';
import { HttpClientService } from './services/httpClient.service';
import { MessageService } from './services/message.service';
import { UsersService } from './services/users.service';
import { ProjectOwnerResolver } from './resolvers/project-owner-resolver.service';
import { CurrentProjectResolver } from './resolvers/current-project-resolver.service';
import { ProjectService } from './services/project.service';
import { ProjectWorkersResolver } from './resolvers/project-workers-resolver.service';
import { UserListResolver } from './resolvers/user-list-resolver.service';
import { LocalDateFromUtcPipe } from './pipes/local-date-from-utc.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AngularMaterialDesignModule,
    RouterModule,
    QuillModule
  ],
  declarations: [
    GetUserNameFromEmailPipe,
    GetStatusNamePipe,
    GetPriorityNamePipe,
    GetClassificationNamePipe,
    ViewRolePipe,
    LocalDateFromUtcPipe
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
    LocalDateFromUtcPipe
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
        // resolvers
        ProjectOwnerResolver,
        CurrentProjectResolver,
        ProjectWorkersResolver,
        UserListResolver,
      ]
    };
  }
}
