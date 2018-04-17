import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatDatepickerInputEvent, MatDialogRef } from '@angular/material';
import { MomentDateAdapter } from '@angular/material-moment-adapter';

import * as moment from 'moment';
import { Moment } from 'moment';
import { BUGTRACKER_DATE_FORMATS, groupDateValidator } from '../../../../shared/validators/date-validators';
import { Project } from '../../models/project.model';
import { QuillEditorConfigurationService } from '../../../../shared/services/quill-editor-configuration.service';


@Component({
  selector: 'app-add-project-form',
  templateUrl: './add-project-form.component.html',
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'ru-RU' },
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: BUGTRACKER_DATE_FORMATS },
  ],
  styles: []
})
export class AddProjectFormComponent implements OnInit {

  addProjectForm: FormGroup;
  project: Project = new Project();

  get title() { return this.addProjectForm.get('title'); }
  get description() { return this.addProjectForm.get('description'); }
  get datepickerGroup() { return this.addProjectForm.get('datepickerGroup'); }
  get dateStart() { return this.addProjectForm.get('datepickerGroup.dateStart'); }
  get dateEnd() { return this.addProjectForm.get('datepickerGroup.dateEnd'); }

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AddProjectFormComponent>,
    private quillEditorConfig: QuillEditorConfigurationService
  ) {
    this.createForm();
  };
  textContent: string = '';
  endDateIncrement: Moment;

  contentChange(event: any) {
    this.textContent = event.text;
  }

  dateChangeEvent(event: MatDatepickerInputEvent<Date>) {
    if (event.value != null) {
      event.target.value = event.value
    }

    this.endDateIncrement = moment(this.dateStart.value).add(1, 'd');
    this.description.dirty
  }

  addProject(): void {
    if (this.addProjectForm.valid) {
      this.description.touched
      let newProject = new Project({
        Title: this.title.value,
        DateStart: this.dateStart.value,
        DateEnd: this.dateEnd.value,
        Description: this.description.value
      });

      this.dialogRef.close({ 'projectData': newProject });

    } else {
      throw new Error("Проект не создан. Проверьте правильность ввода данных.")
    }
  }

  private createForm(): void {
    this.addProjectForm = this.formBuilder.group({
      'title': [this.project.Title, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100),
        Validators.pattern("^[А-Яа-я0-9 _-]*$")
      ]],
      'description': [this.project.Description, [
        Validators.required,
        Validators.minLength(10),
        // Validators.pattern("^[А-Яа-я0-9,.! _-]*$")
      ]],
      'datepickerGroup': this.formBuilder.group({
        'dateStart': [this.project.DateStart],
        'dateEnd': [this.project.DateEnd]
      }, { 'validator': groupDateValidator })
    });
  }

  ngOnInit() {
  }

}