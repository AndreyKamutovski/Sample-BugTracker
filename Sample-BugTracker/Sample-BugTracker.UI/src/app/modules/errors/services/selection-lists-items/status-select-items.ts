import { SelectItem } from "../../interfaces/select-item";
import { StatusList } from "../../enums/status-list.enum";
import { Injectable } from "@angular/core";
import { BaseSelectItem } from "./base-select-item";

@Injectable()
export class StatusSelectItems extends BaseSelectItem<StatusList> {
    private _statuses: SelectItem<StatusList>[] = [
        { value: StatusList.OPEN, viewValue: 'Открыто', color: "blue" },
        { value: StatusList.DECIDED, viewValue: 'Выполняется', color: "bisque" },
        { value: StatusList.NECESSARYTEST, viewValue: 'Необходимо протестировать', color: "lightgreen" },
        { value: StatusList.CLOSED, viewValue: 'Закрыто', color: "turquoise" }
    ];

    public get Statuses(): SelectItem<StatusList>[] {
        return this._statuses;
    }

    public getViewValue(value: StatusList): string {
        return super.getSelectItemViewValue(this._statuses, value);
     }

     public getColor(value: StatusList): string {
        return super.getSelectItemColor(this._statuses, value);
     }
}
