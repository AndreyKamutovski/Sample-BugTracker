import { Injectable } from '@angular/core';

import { StatusList } from '../../../enums/status-list.enum';
import { SelectItem } from '../../../interfaces/select-item';


@Injectable() 
export class ErrorStatusSelectService {

  constructor() { }

  private _statuses: SelectItem[] = [
    { value: StatusList.OPEN, viewValue: 'Открыто', color: "" },
    { value: StatusList.DECIDED, viewValue: 'Выполняется', color: "" },
    { value: StatusList.NECESSARYTEST, viewValue: 'Необходимо протестировать', color: "" },
    { value: StatusList.CLOSED, viewValue: 'Закрыто', color: "" }
  ];

  public get Statuses(): SelectItem[] {
    return this._statuses;
  }
}
