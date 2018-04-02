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

    constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) {
        this.loginForm = this.formBuilder.group({
            'email': ['', [Validators.required, Validators.email]],
            'password': ['', Validators.required]
        })
    }

    get email() { return this.loginForm.get('email'); }
    get password() { return this.loginForm.get('password'); }


    login() {
        if (this.loginForm.valid) { //  && this.captcha.isCaptchaChecked
            this.authService.login(this.loginForm.value).subscribe(
                data => {
                    this.router.navigateByUrl('app/project');
                });
        }
    }

    ngOnInit() {

    }
}