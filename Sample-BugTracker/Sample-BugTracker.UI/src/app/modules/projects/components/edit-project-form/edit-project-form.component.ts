import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDatepickerInputEvent } from '@angular/material';
import * as moment from 'moment';
import { QuillEditorConfigurationService } from '../../../../shared/services/quill-editor-configuration.service';
import { groupDateValidator } from '../../../../shared/validators/date-validators';
import { Project } from '../../models/project.model';
import { Moment } from 'moment';

@Component({
  selector: 'app-edit-project-form',
  templateUrl: './edit-project-form.component.html',
  styles: []
})
export class EditProjectFormComponent implements OnInit {

  editProjectForm: FormGroup;
  project: Project = new Project();

  get title() { return this.editProjectForm.get('title'); }
  get description() { return this.editProjectForm.get('description'); }
  get datepickerGroup() { return this.editProjectForm.get('datepickerGroup'); }
  get dateStart() { return this.editProjectForm.get('datepickerGroup.dateStart'); }
  get dateEnd() { return this.editProjectForm.get('datepickerGroup.dateEnd'); }

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<EditProjectFormComponent>,
    private quillEditorConfig: QuillEditorConfigurationService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.project = this.data.editedProject;
    this.endDate = this.data.editedProject.DateStart;
    this.textContent = this.data.editedProject.Description;
    this.createForm();
  };
  textContent: string;
  endDate: any;

  dateChangeEvent(event: MatDatepickerInputEvent<Date>) {
    this.endDate = event.value;
  }

  contentChange(event: any) {
    this.textContent = event.text;
  }

  editProject(): void {
    if (this.editProjectForm.valid) {
      let newProject = new Project({
        ProjectId: this.project.ProjectId,
        Title: this.title.value,
        DateStart: this.dateStart.value,
        DateEnd: this.dateEnd.value,
        Description: this.description.value,
        ErrorStatistics: this.project.ErrorStatistics
      });

      this.dialogRef.close({ 'projectData': newProject });

    } else {
      throw new Error("Проект не обновлён. Проверьте правильность ввода данных.")
    }
  }

  private createForm(): void {
    this.editProjectForm = this.formBuilder.group({
      'title': [this.project.Title, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100),
        Validators.pattern("^[А-Яа-я0-9 _-]*$")
      ]],
      'description': [this.project.Description, [
        Validators.required,
        Validators.minLength(10),
      ]],
      'datepickerGroup': this.formBuilder.group({
        'dateStart': [{ value: this.project.DateStart, disabled: true }],
        'dateEnd': [{ value: this.project.DateEnd, disabled: true }]
      }, { 'validator': groupDateValidator })
    });
  }

  ngOnInit() {
  }

}
