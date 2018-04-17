import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { QuillModule } from 'ngx-quill';

import { AngularMaterialDesignModule } from './../angular-material-design/angular-material-design.module';
import { GetClassificationNamePipe } from './pipes/get-classification-name.pipe';
import { GetPriorityNamePipe } from './pipes/get-priority-name.pipe';
import { GetRoleNamePipe } from './pipes/get-role-name.pipe';
import { GetStatusNamePipe } from './pipes/get-status-name.pipe';
import { GetUserNameFromEmailPipe } from './pipes/get-user-name-from-email.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AngularMaterialDesignModule,
    BrowserAnimationsModule,    
    RouterModule,
    QuillModule
   ],
   declarations: [
    GetUserNameFromEmailPipe,
    GetRoleNamePipe,
    GetStatusNamePipe,
    GetPriorityNamePipe,
    GetClassificationNamePipe,
   ],
   exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AngularMaterialDesignModule,
    RouterModule,
    QuillModule,
    GetUserNameFromEmailPipe,
    GetRoleNamePipe,
    
   ],
})
export class SharedModule { }
