import { OverlayPanelModule } from 'primeng/overlaypanel';
import { TableModule } from 'primeng/table';
import { ContextMenuModule }  from 'primeng/contextmenu'
import { MenuModule } from 'primeng/menu';
import { NgModule } from '@angular/core';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material';
import { MomentDateAdapter } from '@angular/material-moment-adapter';

import { NavbarModule } from '../navbar/navbar.module';
import { SharedModule } from '../shared/shared.module';
import { BUGTRACKER_DATE_FORMATS } from '../shared/validators/date-validators';
import { AddProjectFormComponent } from './components/add-project-form/add-project-form.component';
import {
    ConfirmDeletingProjectComponent
} from './components/confirm-deleting-project/confirm-deleting-project.component';
import {
    EditProjectFormComponent
} from './components/edit-project-form/edit-project-form.component';
import { ProjectListComponent } from './components/project-list/project-list.component';
import {
    SelectedProjectPageComponent
} from './components/selected-project-page/selected-project-page.component';
import {
    ProjectDescriptionInputComponent
} from './components/shared/project-description-input/project-description-input.component';
import {
    ProjectStartEndDatesInputComponent
} from './components/shared/project-start-end-dates-input/project-start-end-dates-input.component';
import {
    ProjectTitleInputComponent
} from './components/shared/project-title-input/project-title-input.component';
import { ProjectRoutingModule } from './project-routing.module';
import { ProjectListResolverService } from './resolvers/project-list-resolver.service';
import { ProjectPermissionResolverService } from './resolvers/project-permission-resolver.service';

@NgModule({
  imports: [
    SharedModule,
    NavbarModule,   
    TableModule,
    ContextMenuModule,
     MenuModule,
    OverlayPanelModule,
    ProjectRoutingModule            
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
    ProjectListResolverService,
    ProjectPermissionResolverService,
    { provide: MAT_DATE_LOCALE, useValue: 'ru-RU' },
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: BUGTRACKER_DATE_FORMATS },
  ]
})
export class ProjectsModule { }
