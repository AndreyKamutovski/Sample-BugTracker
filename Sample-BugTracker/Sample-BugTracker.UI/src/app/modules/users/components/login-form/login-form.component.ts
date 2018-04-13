import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styles: []
})
export class LoginFormComponent implements OnInit {

  @ViewChild("captcha") private captcha: CaptchaComponent;
  private loginForm: FormGroup;
  private hidePassword: boolean = true;

  constructor(
      private formBuilder: FormBuilder,
      private authService: AuthService,
      private portalService: PortalService,
      private router: Router) {
      this.loginForm = this.formBuilder.group({
          'Email': ['', [Validators.required, Validators.email]],
          'Password': ['', Validators.required]
      })
  }

  get Email() { return this.loginForm.get('Email'); }
  get Password() { return this.loginForm.get('Password'); }


  login() {
      if (this.loginForm.valid) { //  && this.captcha.isCaptchaChecked
          this.authService.login(this.loginForm.value).then(
              res => {
                  if (this.authService.isLoggedIn) {
                      this.portalService.getUserPortals().toPromise().then(res => {
                          if (res.length > 1) {
                              this.router.navigateByUrl('app/portals');
                          }
                          if (res.length === 1) {
                              sessionStorage.setItem('portalID', res[0].Id);
                              this.router.navigateByUrl('app/project');
                          }
                      });

                  }
              });
      }
  }

  ngOnInit() {

  }
}
