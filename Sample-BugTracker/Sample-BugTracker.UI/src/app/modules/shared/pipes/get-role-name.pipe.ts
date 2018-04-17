import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'getRoleName'
})
export class GetRoleNamePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    let role = (value !== undefined && value !== null && value !== "") ? value : null;
    if (role) {
      switch (role) {
        case "Admin": {
          return "Администратор (Владелец портала)";
        }
        case "Moderator": {
          return "Модератор";
        }
        case "Worker": {
          return "Сотрудник";
        }
        case "User": {
          return "Тестировщик";
        }
      }
    }
    else {
      return "Error: Invalid Role in getRoleName Pipe"
    }
  }
}
