import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-error-title-input',
  templateUrl: './error-title-input.component.html',
  styles: []
})
export class ErrorTitleInputComponent implements OnInit {

  @Input() public form: FormGroup;
  @Input() public initValue: string = '';

  private title: FormControl;

  constructor() { }

  ngOnInit() {
    this.title = new FormControl(this.initValue, [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(100),
      Validators.pattern("^[А-Яа-яa-zA-Z0-9 _-]*$")
    ]);
    this.form.addControl('Title', this.title);
  }

}
