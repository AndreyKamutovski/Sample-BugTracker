import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatDialogRef } from '@angular/material';
import { MomentDateAdapter } from '@angular/material-moment-adapter';

import { BUGTRACKER_DATE_FORMATS } from '../../../shared/validators/date-validators';
import { Project } from '../../models/project.model';

@Component({
  selector: 'app-add-project-form',
  templateUrl: './add-project-form.component.html',
  styles: []
})
export class AddProjectFormComponent {

  addProjectForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddProjectFormComponent>,
  ) {
    this.createForm();
  };

  addProject(): void {
    if (this.addProjectForm.valid) {
      let newProject = new Project({
        Title: this.addProjectForm.value.Title,
        DateStart: this.addProjectForm.get('datepickerGroup.DateStart').value,
        DateEnd: this.addProjectForm.get('datepickerGroup.DateEnd').value,
        Description: this.addProjectForm.value.Description
      });

      this.dialogRef.close({ 'projectData': newProject });

    } else {
      throw new Error("Проект не создан. Проверьте правильность ввода данных.")
    }
  }

  createForm(): void {
    this.addProjectForm = new FormGroup({});
  }
}