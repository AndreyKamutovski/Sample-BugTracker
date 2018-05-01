import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { CaptchaComponent } from '../../../../shared/components/captcha/captcha.component';
import { AuthService } from '../../../../shared/services/auth.service';
import { UsersService } from '../../users.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styles: [':host {display: flex; padding-top: 100px;} :host form {margin: 0 auto;}']
})
export class LoginFormComponent implements OnInit {

  @ViewChild("captcha") private captcha: CaptchaComponent;
  private loginForm: FormGroup;
  private hidePassword: boolean = true;

  constructor(
      private formBuilder: FormBuilder,
      private authService: AuthService,
      private userService: UsersService,
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
                      this.userService.getUserPortals().toPromise().then(res => {
                          if (res.length > 1) {
                              this.router.navigateByUrl('app/portals');
                          }
                          if (res.length === 1) {
                              sessionStorage.setItem('portalID', res[0].PortalId);
                              this.router.navigateByUrl('app/projects');
                          }
                      });

                  }
              });
      }
  }

  ngOnInit() {

  }
}
