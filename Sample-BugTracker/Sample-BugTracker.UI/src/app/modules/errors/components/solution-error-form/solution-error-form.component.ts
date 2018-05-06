import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MatSnackBar } from '@angular/material';
import { AuthService } from '../../../../shared/services/auth.service';
import { ErrorService } from '../../services/error.service';

@Component({
  selector: 'app-solution-error-form',
  templateUrl: './solution-error-form.component.html',
  styles: []
})
export class SolutionErrorFormComponent implements OnInit {

  private solutionErrorForm: FormGroup;
  private now: Date;

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<SolutionErrorFormComponent>,
    private errorService: ErrorService,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    

  ) {
    this.now = new Date(Date.now());
    this.createForm();
  };




  addSolution(): void {
    if (this.solutionErrorForm.valid) {
      this.errorService.addSolution(this.solutionErrorForm.value).toPromise().then((error: SolutionErrorFormComponent) => {
        this.snackBar.open("Решение ошибки добавлено", '', { duration: 2000 });
      });
      this.dialogRef.close({ 'solution': this.solutionErrorForm.value });

    } else {
      throw new Error("Решение не добавлено. Проверьте правильность ввода данных.")
    }
  }

  private createForm(): void {
    this.solutionErrorForm = this.formBuilder.group({
      'ErrorStatus': ["", [Validators.required]],
      "Description": ["", [
        Validators.required,
        Validators.maxLength(5000),
      ]],
      'DateSolution': [this.now, [Validators.required]],
    });
  }

  get errorStatus() { return this.solutionErrorForm.get('ErrorStatus'); }
  get description() { return this.solutionErrorForm.get('Description'); }
  get dateSolution() { return this.solutionErrorForm.get('DateSolution'); }

  ngOnInit() {
  }

}
