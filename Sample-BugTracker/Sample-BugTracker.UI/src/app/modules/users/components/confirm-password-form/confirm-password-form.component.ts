private confirmPasswordForm: FormGroup;

constructor(
  private formBuilder: FormBuilder,
  public dialogRef: MatDialogRef<ConfirmPasswordFormComponent>,
  @Inject(MAT_DIALOG_DATA) public data: any
) {
  this.createForm();
};
private hidePassword: boolean = true;
private hidePConfirm: boolean = true;

get password() { return this.confirmPasswordForm.get('Password'); }
get confirmPassword() { return this.confirmPasswordForm.get('ConfirmPassword'); }

private createForm(): void {
  this.confirmPasswordForm = this.formBuilder.group({
    'Password': ['', [
      Validators.required,
      Validators.minLength(6),
      Validators.pattern("[^А-Яа-я]+"),
      nonLetterOrDigitPasswordValidator,
      requireDigitPasswordValidator,
      requireLowercasePasswordValidator,
      requireUppercasePasswordValidator
    ]],
    'ConfirmPassword': ['', [Validators.required, Validators.minLength(6)]],
    'guid': [this.data.Guid]
  }, { validator: equalPasswordValidator });
}

enterConfirmPassword(): void {
  if (this.confirmPasswordForm.valid) {
    this.dialogRef.close({ 'confirmData': this.confirmPasswordForm.value });
  } else {
    throw new Error("Пароль не подтверждён. Проверьте правильность ввода данных и перейдите по ссылке в электронном сообщении ещё раз.")
  }
}

ngOnInit() {
}