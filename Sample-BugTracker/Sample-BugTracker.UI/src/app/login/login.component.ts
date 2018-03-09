import 'rxjs/add/operator/catch';

import { Component, ViewChild } from '@angular/core';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { Router } from '@angular/router';

import { CaptchaComponent } from '../captcha/captcha.component';
import { AuthService } from '../services/auth.service';
import { User } from '../shared/models/user.model';

@Component({
    moduleId: module.id,
    selector: 'app-login',
    templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit {

    @ViewChild("captcha")
    private captcha: CaptchaComponent;
    private user: User = new User();

    constructor(private authService: AuthService, private router: Router) { }

    login() {
        if (this.captcha.isCaptchaChecked) {
            this.authService.login(this.user).subscribe(
                data => {
                    this.router.navigateByUrl('app/project');
                });
        }
    }

    ngOnInit() {

    }
}