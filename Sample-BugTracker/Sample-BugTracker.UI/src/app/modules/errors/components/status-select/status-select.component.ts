import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { StatusSelectItems } from '../../services/selection-lists-items/status-select-items';

@Component({
  selector: 'app-status-select',
  templateUrl: './status-select.component.html',
  styles: []
})
export class StatusSelectComponent implements OnInit {

  @Input() status: FormControl;
  @Output() valueChange = new EventEmitter<number>();

  constructor(
    public statusSelectItemsService: StatusSelectItems,
  ) { }

  ngOnInit() {
  }

  selectChange(value: number) {
    this.valueChange.emit(value);
  }
}
