import { Component } from '@angular/core';
import { AuthService } from "../services/auth.service";
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
    moduleId: module.id,
    selector: 'app-login',
    templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit {
    
    constructor(private authService: AuthService) { }

    login() {
        this.authService.login();
    }

    ngOnInit() {
        
    }
}