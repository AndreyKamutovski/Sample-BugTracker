import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Injectable()
export class MessageService {

  constructor(private snackBar: MatSnackBar) { }

  showSnackBarMsg(msg: string): void {
    this.snackBar.open(msg, '', { duration: 2000 });
  }
}
