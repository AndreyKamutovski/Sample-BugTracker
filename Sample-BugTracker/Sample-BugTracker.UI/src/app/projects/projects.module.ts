import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AngularMaterialDesignModule } from '../angular-material-design/angular-material-design.module';
import { AddProjectFormComponent } from './add-project-form/add-project-form.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { ProjectsComponent } from './projects.component';
import { SelectedProjectPageComponent } from './selected-project-page/selected-project-page.component';
import { ProjectService } from './shared/project.service';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AngularMaterialDesignModule,
    RouterModule,
  ],
  entryComponents: [
    AddProjectFormComponent
  ],
  declarations: [
    ProjectsComponent,
    ProjectListComponent,
    AddProjectFormComponent,
    SelectedProjectPageComponent,

  ],
  providers: [
    ProjectService,
  ]
})
export class ProjectsModule { }
