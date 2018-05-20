import { ClassificationList } from '../../enums/classification-list.enum';
import { SelectItem } from '../../interfaces/select-item';
import { Injectable } from '@angular/core';
import { BaseSelectItem } from './base-select-item';

@Injectable()
export class ClassificationSelectItems extends BaseSelectItem<ClassificationList> {
    private _classifications: SelectItem<ClassificationList>[] = [
        { value: ClassificationList.SECURITY, viewValue: 'Безопасность', color: "" },
        { value: ClassificationList.CRASHORHANG, viewValue: 'Сбой/зависание', color: "" },
        { value: ClassificationList.DATALOSS, viewValue: 'Потеря данных', color: "" },
        { value: ClassificationList.PERFORMANCE, viewValue: 'Производительность', color: "" },
        { value: ClassificationList.UI, viewValue: 'Пользовательский интерфейс', color: "" },
        { value: ClassificationList.OTHERERROR, viewValue: 'Другая ошибка', color: "" }
    ];

    public get Classifications(): SelectItem<ClassificationList>[] {
        return this._classifications;
    }

    public getViewValue(value: ClassificationList): string {
       return super.getSelectItemViewValue(this._classifications, value);
    }
}
