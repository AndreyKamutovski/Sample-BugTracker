import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ProjectService } from '../shared/project.service';
import { Project } from '../shared/project.model';
import { MatDatepickerInputEvent, MAT_DATE_LOCALE, DateAdapter, MAT_DATE_FORMATS, MatDialogRef } from '@angular/material';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { groupDateValidator, BUGTRACKER_DATE_FORMATS } from '../shared/date-validators';
import * as _moment from 'moment';

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


  constructor(private projectService: ProjectService, private formBuilder: FormBuilder, public dialogRef: MatDialogRef<AddProjectFormComponent>) {
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
        Validators.pattern("^[А-Яа-я0-9, _-]*$")
      ]],
      'datepickerGroup': formBuilder.group({
        'dateStart': [this.project.DateStart],
        'dateEnd': [this.project.DateEnd]
      }, { 'validator': groupDateValidator })
    });
  };

  dateChangeEvent(event: MatDatepickerInputEvent<Date>) {
    if (event.value != null) {
      event.target.value = event.value
    }
  }

  get title() { return this.addProjectForm.get('title'); }
  get description() { return this.addProjectForm.get('description'); }
  get datepickerGroup() { return this.addProjectForm.get('datepickerGroup'); }
  get dateStart() { return this.addProjectForm.get('datepickerGroup.dateStart'); }
  get dateEnd() { return this.addProjectForm.get('datepickerGroup.dateEnd'); }

  addProject(): void {
    if (this.addProjectForm.valid) {
      let newProject = new Project({
        Title: this.title.value,
        DateStart: this.dateStart.value,
        DateEnd: this.dateEnd.value,
        Description: this.description.value
      });
      this.projectService.addProject(newProject).subscribe(
        res => {
          //this.dataSource.data.push(res);
          this.addProjectForm.reset();
          this.dialogRef.close({ 'isSuccessfull': true, 'data': res });
        }
      );
    } else {
      throw new Error("Проект не создан. Проверьте правильность ввода данных.")
    }
  }

  ngOnInit() {

  }

}