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
  ],
  providers: [
    ProjectService,
    ProjectListResolverService,
    CurrentProjectResolverService,
    ProjectPermissionResolverService,
    UsersService,
  ]
})
export class ProjectsModule { }
