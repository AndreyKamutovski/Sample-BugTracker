import { Injectable } from '@angular/core';
import { SelectItem } from '../../../interfaces/select-item';
import { PriorityList } from '../../../enums/priority-list.enum';

@Injectable()
export class ErrorPrioritySelectService {

  constructor() { }

  private _priorities: SelectItem[] = [
    { value: PriorityList.CRITICAL, viewValue: 'Критический', color: "" },
    { value: PriorityList.HIGH, viewValue: 'Высокий', color: "" },
    { value: PriorityList.MIDDLE, viewValue: 'Средний', color: "" },
    { value: PriorityList.LOW, viewValue: 'Низкий', color: "" }
  ];

  public get Priorities(): SelectItem[] {
    return this._priorities;
  }

}
