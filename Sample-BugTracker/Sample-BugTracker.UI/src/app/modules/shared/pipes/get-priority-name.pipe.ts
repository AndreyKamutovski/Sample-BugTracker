import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'getPriorityName'
})
export class GetPriorityNamePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    let priority = (value !== undefined && value !== null) ? value : null;
    if (priority) {
      switch (priority) {
        case 1: {
          return "Критический";
        }
        case 2: {
          return "Высокий";
        }
        case 3: {
          return "Средний";
        }
        case 4: {
          return "Низкий";
        }
      }
    }
    else {
      return "Error: Invalid Priority in getPriorityName Pipe"
    }
  }
}
