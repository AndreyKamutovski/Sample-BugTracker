import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { ErrorPrioritySelectService } from './error-priority-select.service';
import { PriorityList } from '../../../enums/priority-list.enum';

@Component({
  selector: 'app-error-priority-select',
  templateUrl: './error-priority-select.component.html',
  styles: []
})
export class ErrorPrioritySelectComponent implements OnInit {

  @Input() public form: FormGroup;
  @Input() public initValue: PriorityList = PriorityList.CRITICAL;

  private priority: FormControl;

  constructor(private errorPrioritySelectService: ErrorPrioritySelectService ) { }
  
  ngOnInit() {
    this.priority = new FormControl(this.initValue, [
      Validators.required
    ]);
    this.form.addControl('Priority', this.priority);
  }
}
