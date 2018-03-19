import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ProjectService } from '../shared/project.service';
import { Project } from '../shared/project.model';

@Component({
  selector: 'app-add-project-form',
  templateUrl: './add-project-form.component.html',
  styles: []
})
export class AddProjectFormComponent implements OnInit {

  addProjectForm: FormGroup;
  project: Project = new Project();

  constructor(private projectService: ProjectService, private formBuilder: FormBuilder) {
    this.addProjectForm = this.formBuilder.group({
      'title': [this.project.Title, [Validators.required, Validators.minLength(3)]],
      'description': [this.project.Description, [Validators.required, Validators.minLength(10)]],
      'datepickerGroup': formBuilder.group({
        'dateStart': [this.project.DateStart, Validators.required],
        'dateEnd': [this.project.DateEnd, Validators.required]
      }, { validator: dateValidator })
    });
  };

  get title() { return this.addProjectForm.get('title'); }
  get description() { return this.addProjectForm.get('description'); }
  // get datepickerGroup() { return this.addProjectForm..get('datepickerGroup'); }
  get dateStart() { return this.addProjectForm.get('datepickerGroup.dateStart'); }
  get dateEnd() { return this.addProjectForm.get('datepickerGroup.dateEnd'); }

  addProject(): void {
    if (this.addProjectForm.valid) {
      this.projectService.addProject(this.addProjectForm.value).subscribe(
        res => {
          //this.dataSource.data.push(res);
          this.addProjectForm.reset();
        }
      );
    } else {
      throw new Error("Проект не создан. Проверьте правильность ввода данных.")
    }
  }



  ngOnInit() {
  }

}

function   dateValidator({ value }: FormGroup): { [key: string]: any } {
    let { dateStart, dateEnd } = value;
    let valid = (dateEnd >= dateStart) ? true : false;
    return valid ? null : { 'messageError': 'Дата окончания проекта не может быть раньше даты начала проекта.' };
  }
