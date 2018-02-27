import { Component, ViewChild } from '@angular/core';
import { AuthService, REST_URI } from "../services/auth.service";
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { User } from "../shared/models/user.model";
import { Router } from '@angular/router';
import { CaptchaComponent } from "../captcha/captcha.component";
import "rxjs/add/operator/catch";

@Component({
    moduleId: module.id,
    selector: 'app-login',
    templateUrl: 'login.component.html',
    providers: [AuthService, { provide: REST_URI, useValue: `http://${location.hostname}:2038/` }]
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