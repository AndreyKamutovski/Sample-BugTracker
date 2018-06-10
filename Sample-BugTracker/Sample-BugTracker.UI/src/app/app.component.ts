import { Component, InjectionToken } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import * as moment from 'moment';

import { LoaderService } from './modules/loader/loader.service';

export const ERROR_ATTACHMENT_URI = new InjectionToken('ERROR_ATTACHMENT_URI');


@Component({
    moduleId: module.id,
    selector: 'app-root',
    template: `
    <router-outlet></router-outlet>
    <app-loader></app-loader>
    `
})
export class AppComponent {
    constructor(
        private router: Router,
        private loadingService: LoaderService,
    ) { }

    ngOnInit() {
        // .format("YYYY-MM-DD");
        Date.prototype.toISOString = Date.prototype.toJSON = function () { return moment(this).utc().format() }
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