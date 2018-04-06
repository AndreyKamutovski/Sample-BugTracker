import 'rxjs/add/operator/catch';

import { Component, ViewChild } from '@angular/core';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { CaptchaComponent } from '../captcha/captcha.component';
import { AuthService } from '../services/auth.service';
import { User } from '../shared/models/user.model';

@Component({
    moduleId: module.id,
    selector: 'app-login',
    templateUrl: 'login.component.html',
    styles: ['form {width: 50%; margin: 5% auto;}']
})
export class LoginComponent implements OnInit {

    @ViewChild("captcha") private captcha: CaptchaComponent;
    private loginForm: FormGroup;
    private hidePassword: boolean = true;

    constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) {
        this.loginForm = this.formBuilder.group({
            'Email': ['', [Validators.required, Validators.email]],
            'Password': ['', Validators.required]
        })
    }

    get Email() { return this.loginForm.get('Email'); }
    get Password() { return this.loginForm.get('Password'); }


    login() {
        if (this.loginForm.valid) { //  && this.captcha.isCaptchaChecked
            this.authService.login(this.loginForm.value).subscribe(
                res => {
                    if (this.authService.isLoggedIn) {
                        this.router.navigateByUrl('app/project');
                    }
                });
        }
    }

    ngOnInit() {

    }
}