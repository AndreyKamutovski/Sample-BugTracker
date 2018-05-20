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
  if (fg.contains('DateStart') && fg.contains('DateEnd')) {
    let dateStart = moment(fg.get('DateStart').value).format();
    let dateEnd = moment(fg.get('DateEnd').value).format();
    if (dateEnd < dateStart) {
      let ctlDateEnd = fg.get('DateEnd');
      ctlDateEnd.markAsDirty();
      ctlDateEnd.setErrors({
        'endDateError': true
      });
      return {
        'groupdate': {
          'errorMsg': 'Дата окончания проекта не может быть раньше даты начала проекта.'
        }
      };
    }
  }
  return null;
}