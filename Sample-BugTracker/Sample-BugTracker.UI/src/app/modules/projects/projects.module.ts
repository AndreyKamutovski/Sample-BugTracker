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


@NgModule({
  imports: [
    SharedModule,
    NavbarModule,               
  ],
  entryComponents: [
    AddProjectFormComponent
  ],
  declarations: [
    ProjectListComponent,
    AddProjectFormComponent,
    SelectedProjectPageComponent,
  ],
  providers: [
    ProjectService,
    ProjectListResolverService,
    CurrentProjectResolverService,
    UsersService,
  ]
})
export class ProjectsModule { }
