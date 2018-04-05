import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AngularMaterialDesignModule } from '../angular-material-design/angular-material-design.module';
import { AddProjectFormComponent } from './add-project-form/add-project-form.component';
import { AddUserFormComponent } from './add-user-form/add-user-form.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ErrorsComponent } from './errors/errors.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { ProjectsComponent } from './projects.component';
import { SelectedProjectPageComponent } from './selected-project-page/selected-project-page.component';
import { ProjectService } from './services/project.service';
import { UsersService } from './services/users.service';
import { UserListComponent } from './user-list/user-list.component';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AngularMaterialDesignModule,
    RouterModule,
  ],
  entryComponents: [
    AddProjectFormComponent,
    AddUserFormComponent
  ],
  declarations: [
    ProjectsComponent,
    ProjectListComponent,
    AddProjectFormComponent,
    SelectedProjectPageComponent,
    UserListComponent,
    DashboardComponent,
    ErrorsComponent,
    AddUserFormComponent,

  ],
  providers: [
    ProjectService,
    UsersService
  ]
})
export class ProjectsModule { }
