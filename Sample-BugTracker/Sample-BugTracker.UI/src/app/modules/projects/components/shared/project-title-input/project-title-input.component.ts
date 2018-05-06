import { Component, OnInit, Input } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-project-title-input',
  templateUrl: './project-title-input.component.html',
  styles: []
})
export class ProjectTitleInputComponent implements OnInit {

  title: FormControl;
  @Input() public titleApp: string;
  
  constructor() { }

  ngOnInit() {
    this.title = new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(100),
      Validators.pattern("^[А-Яа-я0-9 _-]*$")
    ])
  }

}
