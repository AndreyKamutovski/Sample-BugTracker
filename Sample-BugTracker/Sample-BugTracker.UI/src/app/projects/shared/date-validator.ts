import { FormGroup } from "@angular/forms";

export function dateValidator(fg: FormGroup): { [key: string]: any } {
    let dateStart = fg.get('dateStart');
    let dateEnd = fg.get('dateEnd');
    if (dateEnd != null && dateStart != null) {
      if (dateEnd.value != null && dateStart.value != null) {
        return (dateEnd.value >= dateStart.value) ? null : {
          'date': {
            'errorMsg': 'Дата окончания проекта не может быть раньше даты начала проекта.'
          }
        };
      }
    }
    else return null;
  }