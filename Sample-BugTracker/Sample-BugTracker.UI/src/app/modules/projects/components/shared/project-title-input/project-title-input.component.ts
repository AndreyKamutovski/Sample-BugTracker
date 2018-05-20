import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-project-title-input',
  templateUrl: './project-title-input.component.html',
  styles: []
})
export class ProjectTitleInputComponent implements OnInit {

  @Input()  form: FormGroup;
  @Input()  initValue: string = '';

   title: FormControl;

  constructor() { }

  ngOnInit() {
    this.title = new FormControl(this.initValue, [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(100),
      Validators.pattern("^[A-Za-zА-Яа-я0-9 _-]*$")
    ]);
    this.form.addControl('Title', this.title);
  }
}
