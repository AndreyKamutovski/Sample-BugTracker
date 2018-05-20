import { SelectItem } from "../../interfaces/select-item";

export class BaseSelectItem<T> {
    public getSelectItemViewValue(selectList: SelectItem<T>[], value: T): string {
        let selectItem: SelectItem<T> = selectList.find(s => s.value == value);
        return selectItem ? selectItem.viewValue : "View value not found";
    }

    public getSelectItemColor(selectList: SelectItem<T>[], value: T): string {
        let selectItem: SelectItem<T> = selectList.find(s => s.value == value);
        return selectItem ? selectItem.color : "Color value not found";
    }
}
