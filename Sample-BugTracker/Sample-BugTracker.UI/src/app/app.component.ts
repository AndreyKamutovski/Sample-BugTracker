import { Component } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';

import { LoaderService } from './modules/loader/loader.service';


@Component({
    moduleId: module.id,
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent {
    constructor(
        private router: Router,
        private loadingService: LoaderService,
    ) {}
        
    ngOnInit(){
        this.router.events.subscribe(e => {
       
                   if (e instanceof NavigationStart) {
                       this.loadingService.show();
                   }
       
                   if (e instanceof NavigationEnd) {
                    this.loadingService.hide();
                }
               });
       }
}