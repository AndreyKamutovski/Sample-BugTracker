import { Pipe, PipeTransform } from '@angular/core';
import { UsersService } from '../../users/users.service';

@Pipe({
  name: 'viewRole'
})
export class ViewRolePipe implements PipeTransform {

  constructor(private usersService: UsersService) { }


  transform(value: any, args?: any): string {
    let role = (value !== undefined && value !== null) ? value : null;
    return role ? this.usersService.roles.find(r => r.value === role).viewValue : "Error: Invalid Role in ViewRole Pipe";
  }
}
