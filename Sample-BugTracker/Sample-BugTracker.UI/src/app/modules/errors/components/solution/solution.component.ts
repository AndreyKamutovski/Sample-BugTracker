import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';

import { ErrorSolution } from '../../models/error-solution.model';
import { ErrorSolutionFormComponent } from '../error-solution-form/error-solution-form.component';
import { ErrorBT } from '../../models/error.model';

@Component({
  selector: 'app-solution',
  templateUrl: './solution.component.html',
  styles: []
})
export class SolutionComponent implements OnInit {

  @Input() error: ErrorBT;
  solution: ErrorSolution;

  constructor(
    public dialog: MatDialog,

  ) { }

  ngOnInit() {
this.solution = this.error.Solution;
  }

  addSolutionDialog() {
    let dialogRef = this.dialog.open(ErrorSolutionFormComponent, {
      width: '50%',
      maxWidth: '50%',
      data: { 'error': this.error }
    });
    dialogRef.afterClosed().subscribe(this.afterCloseAddSolutionDialog.bind(this));
  }

  afterCloseAddSolutionDialog(data: any) {
this.solution.Description = data.solution.Description;
  }

}
