import { FormGroup } from "@angular/forms";
import { FormControl } from "@angular/forms/src/model";
import * as moment from "moment";

export const BUGTRACKER_DATE_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'LL',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

export function groupDateValidator(fg: FormGroup): { [key: string]: any } {
  let dateStart = fg.get('dateStart');
  let dateEnd = fg.get('dateEnd');
  if (dateEnd != null && dateStart != null) {
    if (dateEnd.value != null && dateStart.value != null) {
      return (dateEnd.value >= dateStart.value) ? null : {
        'groupdate': {
          'errorMsg': 'Дата окончания проекта не может быть раньше даты начала проекта.'
        }
      };
    }
  }
  else return null;
}