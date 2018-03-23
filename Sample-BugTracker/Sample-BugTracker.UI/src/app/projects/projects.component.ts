import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material';
import { AddProjectFormComponent } from './add-project-form/add-project-form.component';
import { ProjectListComponent } from './project-list/project-list.component';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styles: []
})
export class ProjectsComponent implements OnInit {

  constructor(public dialog: MatDialog) { }
  @ViewChild("projectList") private projectList: ProjectListComponent;

  openAddProjectDialog(): void {
    let dialogRef = this.dialog.open(AddProjectFormComponent, {
      width: '50%',
      data: {}
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res.isSuccessfull && res.data != null) {
        this.projectList.dataSource.data.push(res.data);
      }
    });
  }

  ngOnInit() {
  }

}
