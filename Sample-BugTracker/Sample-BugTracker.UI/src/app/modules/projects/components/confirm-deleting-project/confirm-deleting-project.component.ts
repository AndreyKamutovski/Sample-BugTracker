import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-confirm-deleting-project',
  templateUrl: './confirm-deleting-project.component.html',
  styles: []
})
export class ConfirmDeletingProjectComponent implements OnInit {

  projectTitle: string;

  constructor( @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.projectTitle = this.data.projectTitle;
  }
}
