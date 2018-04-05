import { ErrorHandler, Injectable, Injector, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { GlobalErrorHandlerComponent } from './global-error-handler.component';

@Injectable()
export class GlobalErrorHandlerService implements ErrorHandler {

  private dialog: MatDialog;

  constructor(private injector: Injector) {
    setTimeout(() => { this.dialog = this.injector.get(MatDialog); });
  }

  handleError(error: any): void {
    let msg = error instanceof Error ? error.message : error.toString();
    if (this.dialog != undefined) {
      let dialogRef = this.dialog.open(GlobalErrorHandlerComponent, {
        width: '50%',
        data: { errorMsg: msg }
      });
    }
    // throw error;
  }
}
