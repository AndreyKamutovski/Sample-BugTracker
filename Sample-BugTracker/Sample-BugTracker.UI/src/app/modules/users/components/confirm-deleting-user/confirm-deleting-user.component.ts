import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-confirm-deleting-user',
  templateUrl: './confirm-deleting-user.component.html',
  styles: []
})
export class ConfirmDeletingUserComponent implements OnInit {

  private userEmail: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.userEmail = this.data.userEmail;
   }

  ngOnInit() {
  }

}
