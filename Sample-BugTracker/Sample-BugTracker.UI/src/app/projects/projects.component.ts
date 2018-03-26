import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';

import { AddProjectFormComponent } from './add-project-form/add-project-form.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { ProjectService } from './shared/project.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styles: []
})
export class ProjectsComponent implements OnInit {

  constructor(private projectService: ProjectService, public dialog: MatDialog, public snackBar: MatSnackBar) { }
  @ViewChild("projectList") private projectList: ProjectListComponent;

  openAddProjectDialog(): void {
    let dialogRef = this.dialog.open(AddProjectFormComponent, {
      width: '50%',
      data: {}
    });

    dialogRef.afterClosed().subscribe(resDialog => {
      if (resDialog != null) {
        if (resDialog.projectData != null) {
          this.projectService.addProject(resDialog.projectData).subscribe(newProject => {
            this.projectList.addRow(newProject);
            this.snackBar.open('Проект успешно создан', '', {
              duration: 2000,
            });
          });
        }
      }
    });
  }

  ngOnInit() {
  }

}
