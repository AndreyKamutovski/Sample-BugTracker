import { ErrorHandler, LOCALE_ID, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ErrorStateMatcher, ShowOnDirtyErrorStateMatcher } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReCaptchaModule } from 'angular2-recaptcha';

import { AngularMaterialDesignModule } from './angular-material-design/angular-material-design.module';
import { AppComponent } from './app.component';
import { routing } from './app.routing';
import { CaptchaComponent } from './captcha/captcha.component';
import { ConfirmPasswordFormComponent } from './confirm-password/confirm-password-form.component';
import { ConfirmPasswordComponent } from './confirm-password/confirm-password.component';
import { GlobalErrorHandlerComponent } from './global-error-handler/global-error-handler.component';
import { GlobalErrorHandlerService } from './global-error-handler/global-error-handler.service';
import { LoaderComponent } from './loader/loader.component';
import { LoaderModule } from './loader/loader.module';
import { LoginComponent } from './login/login.component';
import { PortalModule } from './portal/portal.module';
import { ProjectsModule } from './projects/projects.module';
import { AuthGuardLoginService } from './services/auth-guard-login.service';
import { AuthService } from './services/auth.service';
import { AUTH_HEADER, HttpClientService, REST_URI } from './shared/services/httpClient.service';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        routing,
        ReCaptchaModule,
        AngularMaterialDesignModule,
        BrowserAnimationsModule,
        ProjectsModule,
        PortalModule,
        LoaderModule,
    ],
    declarations: [
        AppComponent,
        LoginComponent,
        CaptchaComponent,
        GlobalErrorHandlerComponent,
        ConfirmPasswordComponent,
        ConfirmPasswordFormComponent,
    ],
    entryComponents: [
        GlobalErrorHandlerComponent,
        ConfirmPasswordFormComponent
    ],
    providers: [
        AuthService,
        AuthGuardLoginService,
        HttpClientService,
        { provide: REST_URI, useValue: 'http://localhost:2038/' },
        { provide: AUTH_HEADER, useValue: `Bearer ${sessionStorage.getItem('token')}` },
        { provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher },
        { provide: LOCALE_ID, useValue: 'ru' },
        { provide: ErrorHandler, useClass: GlobalErrorHandlerService }
    ],
    bootstrap: [
        AppComponent,
        LoaderComponent
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