import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { CaptchaComponent } from '../captcha/captcha.component';
import { AuthService } from '../../services/auth.service';
import { UsersService } from '../../services/users.service';

@Component({
    selector: 'app-login-form',
    templateUrl: './login-form.component.html',
    styles: [':host {display: flex; padding-top: 100px;} :host form {margin: 0 auto;}']
})
export class LoginFormComponent implements OnInit {

    @ViewChild("captcha") private captcha: CaptchaComponent;
    loginForm: FormGroup;
    hidePassword: boolean = true;

    constructor(
        private formBuilder: FormBuilder,
        public authService: AuthService,
        public userService: UsersService,
        public router: Router) {
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
                                this.router.navigateByUrl('portals');
                            }
                            if (res.length === 1) {
                                sessionStorage.setItem('portalID', res[0].PortalId);
                                this.router.navigate(["portals", res[0].Title, "projects"]);
                            }
                        });
                    }
                });
        }
    }

    ngOnInit() {

    }
}
