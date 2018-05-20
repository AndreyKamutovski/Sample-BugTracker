import { SelectItem } from "../../interfaces/select-item";
import { PriorityList } from "../../enums/priority-list.enum";
import { Injectable } from "@angular/core";
import { BaseSelectItem } from "./base-select-item";

@Injectable()
export class PrioritySelectItems extends BaseSelectItem<PriorityList> {
    private _priorities: SelectItem<PriorityList>[] = [
        { value: PriorityList.CRITICAL, viewValue: 'Критический', color: "" },
        { value: PriorityList.HIGH, viewValue: 'Высокий', color: "" },
        { value: PriorityList.MIDDLE, viewValue: 'Средний', color: "" },
        { value: PriorityList.LOW, viewValue: 'Низкий', color: "" }
    ];

    public get Priorities(): SelectItem<PriorityList>[] {
        return this._priorities;
    }

    public getViewValue(value: PriorityList): string {
        return super.getSelectItemViewValue(this._priorities, value);
     }
}
