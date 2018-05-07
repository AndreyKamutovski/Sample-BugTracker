import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ErrorClassificationSelectService } from './error-classification-select.service';
import { ClassificationList } from '../../../enums/classification-list.enum';


@Component({
  selector: 'app-error-classification-select',
  templateUrl: './error-classification-select.component.html',
  styles: []
})
export class ErrorClassificationSelectComponent implements OnInit {

  @Input() public form: FormGroup;
  @Input() public initValue: ClassificationList = ClassificationList.SECURITY;

  private classification: FormControl;

  constructor(private errorClassificationSelectService: ErrorClassificationSelectService ) { }
  
  ngOnInit() {
    this.classification = new FormControl(this.initValue, [
      Validators.required
    ]);
    this.form.addControl('Classification', this.classification);
  }

}
