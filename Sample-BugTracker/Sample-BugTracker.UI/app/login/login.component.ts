import { Component } from '@angular/core';
import { AuthService, REST_URI } from "../services/auth.service";
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { User } from "../shared/models/user.model";

@Component({
    moduleId: module.id,
    selector: 'app-login',
    templateUrl: 'login.component.html',
    providers: [AuthService, { provide: REST_URI, useValue: `http://${location.hostname}:2038/` }]
})
export class LoginComponent implements OnInit {
    user:User = new User();
    test:any[];
    constructor(private authService: AuthService) { }

    login() {
        this.authService.login(this.user).subscribe(data => this.test = data, err => this.test = err);
    }
test2:string;
    testMethod() {
        this.authService.test().subscribe(res => this.test2 = res.text());
    }

    ngOnInit() {
        
    }
}