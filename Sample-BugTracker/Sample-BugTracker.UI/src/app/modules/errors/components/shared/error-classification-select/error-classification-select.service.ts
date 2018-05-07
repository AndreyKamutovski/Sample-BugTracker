import { Injectable } from '@angular/core';

import { ClassificationList } from '../../../enums/classification-list.enum';
import { SelectItem } from '../../../interfaces/select-item';

@Injectable()
export class ErrorClassificationSelectService {

  constructor() { }

  private _classifications: SelectItem[] = [
    { value: ClassificationList.SECURITY, viewValue: 'Безопасность', color: "" },
    { value: ClassificationList.CRASHORHANG, viewValue: 'Сбой/зависание', color: "" },
    { value: ClassificationList.DATALOSS, viewValue: 'Потеря данных', color: "" },
    { value: ClassificationList.PERFORMANCE, viewValue: 'Производительность', color: "" },
    { value: ClassificationList.UI, viewValue: 'Пользовательский интерфейс', color: "" },
    { value: ClassificationList.OTHERERROR, viewValue: 'Другая ошибка', color: "" }
  ];

  public get Classifications(): SelectItem[] {
    return this._classifications;
  }

}
