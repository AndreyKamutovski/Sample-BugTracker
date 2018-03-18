import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { AddProjectFormComponent } from './add-project-form/add-project-form.component';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styles: []
})
export class ProjectsComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  openAddProjectDialog(): void {
    let dialogRef = this.dialog.open(AddProjectFormComponent, {
      width: '50%',
      data: { }
    });
  }

  ngOnInit() {
  }

}
