import { Component, Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDatepickerInputEvent, MatDialogRef } from '@angular/material';

import { Project } from '../../models/project.model';

@Component({
  selector: 'app-edit-project-form',
  templateUrl: './edit-project-form.component.html',
  styles: []
})
export class EditProjectFormComponent {

  editProjectForm: FormGroup;
  project: Project = new Project();

  // get title() { return this.editProjectForm.get('title'); }
  // get description() { return this.editProjectForm.get('description'); }
  // get datepickerGroup() { return this.editProjectForm.get('datepickerGroup'); }
  // get dateStart() { return this.editProjectForm.get('datepickerGroup.dateStart'); }
  // get dateEnd() { return this.editProjectForm.get('datepickerGroup.dateEnd'); }

  constructor(
    public dialogRef: MatDialogRef<EditProjectFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.project = this.data.editedProject;
    // this.endDate = this.data.editedProject.DateStart;
    // this.textContent = this.data.editedProject.Description;
    this.createForm();
  };
  // textContent: string;
  endDate: any;

  // dateChangeEvent(event: MatDatepickerInputEvent<Date>) {
  //   this.endDate = event.value;
  // }

  // contentChange(event: any) {
  //   this.textContent = event.text;
  // }

  editProject(): void {
    if (this.editProjectForm.valid) {
      let newProject = new Project({
        ProjectId: this.project.ProjectId,
        ErrorStatistics: this.project.ErrorStatistics,
        Title: this.editProjectForm.value.Title,
        DateStart: this.editProjectForm.get('datepickerGroup.DateStart').value,
        DateEnd: this.editProjectForm.get('datepickerGroup.DateEnd').value,
        Description: this.editProjectForm.value.Description,
      });

      this.dialogRef.close({ 'projectData': newProject });

    } else {
      throw new Error("Проект не обновлён. Проверьте правильность ввода данных.")
    }
  }

  private createForm(): void {
    this.editProjectForm = new FormGroup({});
  }
}
