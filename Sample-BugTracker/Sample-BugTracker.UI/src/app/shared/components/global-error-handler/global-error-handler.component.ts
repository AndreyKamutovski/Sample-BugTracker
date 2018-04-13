import { Component, OnInit } from '@angular/core';

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
