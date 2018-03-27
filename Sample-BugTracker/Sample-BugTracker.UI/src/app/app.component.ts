import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';


@Component({
    moduleId: module.id,
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent {
    constructor(private authService: AuthService) {}
        
}