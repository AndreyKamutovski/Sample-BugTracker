import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'getClassificationName'
})
export class GetClassificationNamePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    let сlassification = (value !== undefined && value !== null) ? value : null;
    if (сlassification) {
      switch (сlassification) {
        case 1: {
          return "Безопасность";
        }
        case 2: {
          return "Сбой/зависание";
        }
        case 3: {
          return "Потеря данных";
        }
        case 4: {
          return "Производительность";
        }
        case 5: {
          return "Пользовательский интерфейс";
        }
        case 6: {
          return "Другая ошибка";
        }
      }
    }
    else {
      return "Error: Invalid Classification in getClassificationName Pipe"
    }
  }
}
