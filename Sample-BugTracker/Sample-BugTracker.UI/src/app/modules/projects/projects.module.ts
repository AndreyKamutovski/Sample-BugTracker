import { NgModule } from '@angular/core';

import { NavbarModule } from '../navbar/navbar.module';
import { UsersService } from '../users/users.service';
import { SharedModule } from './../shared/shared.module';
import { AddProjectFormComponent } from './components/add-project-form/add-project-form.component';
import { ProjectListComponent } from './components/project-list/project-list.component';
import { SelectedProjectPageComponent } from './components/selected-project-page/selected-project-page.component';
import { ProjectService } from './project.service';
import { CurrentProjectResolverService } from './resolvers/current-project-resolver.service';
import { ProjectListResolverService } from './resolvers/project-list-resolver.service';
import {TableModule} from 'primeng/table';
import { EditProjectFormComponent } from './components/edit-project-form/edit-project-form.component';
import { ConfirmDeletingProjectComponent } from './components/confirm-deleting-project/confirm-deleting-project.component';
import { ProjectPermissionResolverService } from './resolvers/project-permission-resolver.service';
import { ProjectTitleInputComponent } from './components/shared/project-title-input/project-title-input.component';
import { ProjectStartEndDatesInputComponent } from './components/shared/project-start-end-dates-input/project-start-end-dates-input.component';
import { ProjectDescriptionInputComponent } from './components/shared/project-description-input/project-description-input.component';
import { MAT_DATE_LOCALE, MAT_DATE_FORMATS, DateAdapter } from '@angular/material';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { BUGTRACKER_DATE_FORMATS } from '../../shared/validators/date-validators';

@NgModule({
  imports: [
    SharedModule,
    NavbarModule,   
    TableModule            
  ],
  entryComponents: [
    AddProjectFormComponent,
    EditProjectFormComponent,
    ConfirmDeletingProjectComponent
  ],
  declarations: [
    ProjectListComponent,
    AddProjectFormComponent,
    SelectedProjectPageComponent,
    EditProjectFormComponent,
    ConfirmDeletingProjectComponent,
    ProjectTitleInputComponent,
    ProjectStartEndDatesInputComponent,
    ProjectDescriptionInputComponent,
  ],
  providers: [
    ProjectService,
    ProjectListResolverService,
    CurrentProjectResolverService,
    ProjectPermissionResolverService,
    UsersService,
    { provide: MAT_DATE_LOCALE, useValue: 'ru-RU' },
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: BUGTRACKER_DATE_FORMATS },
  ]
})
export class ProjectsModule { }
