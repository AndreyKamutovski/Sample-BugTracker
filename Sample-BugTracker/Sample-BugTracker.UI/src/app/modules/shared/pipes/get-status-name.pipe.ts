import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'getStatusName'
})
export class GetStatusNamePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    let status = (value !== undefined && value !== null) ? value : null;
    if (status) {
      switch (status) {
        case 1: {
          return "Открыто";
        }
        case 2: {
          return "Решено";
        }
        case 3: {
          return "Необходимо протестировать";
        }
        case 4: {
          return "Закрыто";
        }
      }
    }
    else {
      return "Error: Invalid Status in getStatusName Pipe"
    }
  }
}
