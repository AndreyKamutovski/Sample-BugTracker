import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'getUserNameFromEmail'
})
export class GetUserNameFromEmailPipe implements PipeTransform {

  transform(value: string, args?: any): string {
    let userName = (value !== undefined && value !== null && value !== "") ? value : null;
    if (userName) {
      userName = value.trim();
      userName = userName.slice(0, userName.indexOf('@'));
      return userName;
    }
    else {
      return "Error: Invalid Email in getUserNameFromEmail Pipe"
    }
  }
}
