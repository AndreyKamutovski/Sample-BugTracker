import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-global-error-handler',
  templateUrl: './global-error-handler.component.html',
  styles: []
})
export class GlobalErrorHandlerComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) private data: any) { }

  ngOnInit() {
  }

}
