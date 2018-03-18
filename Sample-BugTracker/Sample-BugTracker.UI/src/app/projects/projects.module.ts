import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AngularMaterialDesignModule } from '../angular-material-design/angular-material-design.module';
import { AddProjectFormComponent } from './add-project-form/add-project-form.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { ProjectsComponent } from './projects.component';
import { ProjectService } from './shared/project.service';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: "app/project", component: ProjectsComponent }
    ]),
    ReactiveFormsModule,
    AngularMaterialDesignModule
  ],
  entryComponents: [
    AddProjectFormComponent
  ],
  declarations: [
    ProjectsComponent,
    ProjectListComponent,
    AddProjectFormComponent
  ],
  providers: [ProjectService]
})
export class ProjectsModule { }
