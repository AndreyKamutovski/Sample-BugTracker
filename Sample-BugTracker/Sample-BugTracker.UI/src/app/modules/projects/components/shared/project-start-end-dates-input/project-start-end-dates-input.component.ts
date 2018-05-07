import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material';
import { Moment } from 'moment';
import * as moment from 'moment';

import { groupDateValidator } from '../../../../../shared/validators/date-validators';


@Component({
  selector: 'app-project-start-end-dates-input',
  templateUrl: './project-start-end-dates-input.component.html',
  styles: [
    `.horizontal-datepicker {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
    }`,
    `.horizontal-datepicker > mat-form-field {
      width: 45%;
}`
  ]
})
export class ProjectStartEndDatesInputComponent implements OnInit {

  @Input() public form: FormGroup;
  @Input() public startDateInitValue: Date;
  @Input() public endDateInitValue: Date;

  private datepickerGroup: FormGroup;
  private dateStart: FormControl;
  private dateEnd: FormControl;

  constructor() { }

  ngOnInit() {
    this.dateStart = new FormControl(this.startDateInitValue, [Validators.required]);
    this.dateEnd = new FormControl(this.endDateInitValue, [Validators.required]);

    this.datepickerGroup = new FormGroup({
      'DateStart': this.dateStart,
      'DateEnd': this.dateEnd
    }, [groupDateValidator]);
    this.form.addControl('datepickerGroup', this.datepickerGroup);
  }
}
