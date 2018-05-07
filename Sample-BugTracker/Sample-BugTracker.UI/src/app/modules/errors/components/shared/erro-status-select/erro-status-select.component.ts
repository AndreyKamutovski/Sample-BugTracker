import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ErrorStatusSelectService } from './error-status-select.service';
import { StatusList } from '../../../enums/status-list.enum';

@Component({
  selector: 'app-erro-status-select',
  templateUrl: './erro-status-select.component.html',
  styles: []
})
export class ErroStatusSelectComponent implements OnInit {

  @Input() public form: FormGroup;
  @Input() public initValue: StatusList = StatusList.OPEN;
  @Output() selectionChange = new EventEmitter<StatusList>();

  private status: FormControl;

  constructor(private errorStatusSelectService: ErrorStatusSelectService) { }

  ngOnInit() {
    this.status = new FormControl(this.initValue, [
      Validators.required
    ]);
    this.form.addControl('Status', this.status);
  }

  selectChange(status: StatusList) {
    this.selectionChange.emit(status);
  }
}
