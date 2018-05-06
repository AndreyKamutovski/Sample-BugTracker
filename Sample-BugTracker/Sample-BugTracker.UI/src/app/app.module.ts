import 'chart.js/dist/Chart.min.js';

import { ErrorHandler, LOCALE_ID, NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { ErrorStateMatcher, ShowOnDirtyErrorStateMatcher } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { ReCaptchaModule } from 'angular2-recaptcha';

import { AppComponent } from './app.component';
import { routing } from './app.routing';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { ErrorsModule } from './modules/errors/errors.module';
import { LoaderComponent } from './modules/loader/loader.component';
import { LoaderModule } from './modules/loader/loader.module';
import { PortalModule } from './modules/portal/portal.module';
import { AuthGuardLoginService } from './modules/projects/guards/auth-guard-login.service';
import { ProjectsModule } from './modules/projects/projects.module';
import { SharedModule } from './modules/shared/shared.module';
import { AuthGuardLogoutService } from './modules/users/guards/auth-guard-logout.service';
import { UsersModule } from './modules/users/users.module';
import { CaptchaComponent } from './shared/components/captcha/captcha.component';
import { GlobalErrorHandlerComponent } from './shared/components/global-error-handler/global-error-handler.component';
import { GlobalErrorHandlerService } from './shared/components/global-error-handler/global-error-handler.service';
import { AuthService } from './shared/services/auth.service';
import { HttpClientService, REST_URI } from './shared/services/httpClient.service';
import { PermissionService } from './shared/services/permission.service';
import { QuillEditorConfigurationService } from './shared/services/quill-editor-configuration.service';
import { MessageService } from './shared/services/message.service';

// import { CaptchaComponent } from './captcha/captcha.component';

@NgModule({
    imports: [
        BrowserModule,
        SharedModule,
        HttpModule,
        routing,
        ReCaptchaModule,
        ProjectsModule,
        PortalModule,
        LoaderModule,
        ErrorsModule,
        DashboardModule,
        UsersModule
    ],
    declarations: [
        AppComponent,
        CaptchaComponent,
        GlobalErrorHandlerComponent,
    ],
    entryComponents: [
        GlobalErrorHandlerComponent,
    ],
    providers: [
        AuthService,
        AuthGuardLoginService,
        AuthGuardLogoutService,
        HttpClientService,
        PermissionService,
        MessageService,
        QuillEditorConfigurationService,
        { provide: REST_URI, useValue: 'http://localhost:2038/' },
        { provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher },
        { provide: LOCALE_ID, useValue: 'ru' },
        { provide: ErrorHandler, useClass: GlobalErrorHandlerService }
    ],
    bootstrap: [
        AppComponent,
        LoaderComponent,
    ]
})
export class AppModule {

}


// https://valor-software.com/ng2-charts/#pieChart
// https://github.com/KillerCodeMonkey/ngx-quill
// https://developer.mozilla.org/ru/docs/Web/API/FileReader
// https://nehalist.io/uploading-files-in-angular2/
// https://aberezkin.github.io/ng2-image-upload/#/readme
// https://developer.mozilla.org/ru/docs/Web/API/FileReader/readAsDataURL
// https://medium.com/@jh3y/how-to-creating-a-css-overlay-for-a-circular-image-5e168f9c0895

// https://medium.com/@motcowley/angular-folder-structure-d1809be95542