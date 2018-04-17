import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators/map';
import { startWith } from 'rxjs/operators/startWith';

import { User } from '../../models/user.model';
import { UsersService } from '../../users.service';

@Component({
  selector: 'app-add-user-form',
  templateUrl: './add-user-form.component.html',
  styles: []
})
export class AddUserFormComponent implements OnInit {
  private addUserForm: FormGroup;
  private roles = [
    { value: 'Moderator', viewValue: 'Модератор' },
    { value: 'Worker', viewValue: 'Сотрудник' },
    { value: 'User', viewValue: 'Обычный пользователь' },
  ];
  private existsUser: User[];
  private filteredUserEmails: Observable<string[]>;

  get Email() { return this.addUserForm.get('Email'); }
  get RoleName() { return this.addUserForm.get('RoleName'); }

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<AddUserFormComponent>,
    private userService: UsersService
  ) {
    this.createForm();
  };

  private createForm(): void {
    this.addUserForm = this.formBuilder.group({
      'Email': ['', [Validators.required, Validators.email]],
      'RoleName': ['', [Validators.required]],
      'ProjectId': [sessionStorage.getItem('projectID')]
    });
  }

  addProjectUser(): void {
    if (this.addUserForm.valid) {
      this.dialogRef.close({ 'userData': this.addUserForm.value });
    } else {
      throw new Error("Пользователь не добавлен к проекту. Проверьте правильность ввода данных.")
    }
  }

  ngOnInit(): void {
    this.userService.getAttachableUsers(sessionStorage.getItem('projectID')).toPromise().then(res => {
      this.existsUser = res;
      this.filteredUserEmails = this.Email.valueChanges
        .pipe(
        startWith(''),
        map(val => this.filter(val))
        );
    });
  }

  private filter(val: string): string[] {
    return this.existsUser.filter(user => {
      return user.Email.toLowerCase().indexOf(val.toLowerCase()) >= 0
    }).map(user => user.Email);
  }
}
