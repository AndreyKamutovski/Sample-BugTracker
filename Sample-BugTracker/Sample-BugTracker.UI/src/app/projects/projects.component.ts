import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material';

import { AddProjectFormComponent } from './add-project-form/add-project-form.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { ProjectService } from './shared/project.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styles: []
})
export class ProjectsComponent implements OnInit {

  constructor(private projectService: ProjectService, public dialog: MatDialog) { }
  @ViewChild("projectList") private projectList: ProjectListComponent;

  openAddProjectDialog(): void {
    let dialogRef = this.dialog.open(AddProjectFormComponent, {
      width: '50%',
      data: {}
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res != null) {
        if (res.projectData != null) {
          this.projectService.addProject(res.projectData).subscribe(res => {
            this.projectList.dataSource.data.push(res);
          });
        }
      }
    });
  }

  ngOnInit() {
  }

}
