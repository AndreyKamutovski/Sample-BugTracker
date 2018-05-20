import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

import { REST_URI } from '../../../shared/services/httpClient.service';
import { AttachableUser } from '../../models/attachable-user.model';
import { UsersService } from '../../../shared/services/users.service';

@Component({
  selector: 'app-edit-user-form',
  templateUrl: './edit-user-form.component.html',
  styles: []
})
export class EditUserFormComponent implements OnInit {

   editUserForm: FormGroup;
   roles = [];

  get Email() { return this.editUserForm.get('Email'); }
  get RoleName() { return this.editUserForm.get('RoleName'); }

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<EditUserFormComponent>,
    public userService: UsersService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    @Inject(REST_URI) public uri: string,
  ) {
    this.roles = this.userService.roles.filter(r => r.value != "Admin");
    this.createForm();
  };

  private createForm(): void {
    this.editUserForm = this.formBuilder.group({
      'RoleName': [this.data.editUser.RoleName, [Validators.required]],
    });
  }

  updateUser(): void {
    if (this.editUserForm.valid) {
      let editUser = new AttachableUser(
        this.data.editUser.Email,
        this.editUserForm.value.RoleName,
        +sessionStorage.getItem('projectID')
      );
      this.dialogRef.close({ 'editUser':  editUser});
    } else {
      throw new Error("Пользователь не обновлён. Проверьте правильность ввода данных.")
    }
  }

  ngOnInit(): void {

  }
}
