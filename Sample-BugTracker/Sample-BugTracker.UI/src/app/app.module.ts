import { LOCALE_ID, NgModule, ErrorHandler } from '@angular/core';
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
import { LoginComponent } from './login/login.component';
import { MessageComponent } from './messages/message.component';
import { MessageModule } from './messages/message.module';
import { NavbarComponent } from './navbar/navbar.component';
import { PortalModule } from './portal/portal.module';
import { ProjectsModule } from './projects/projects.module';
import { AuthGuardLoginService } from './services/auth-guard-login.service';
import { AuthService, REST_URI } from './services/auth.service';
import { InputAutofocusDirective } from './shared/directives/input-autofocus.directive';
import { RequestService } from './shared/services/request.service';
import { MessageErrorHandler } from './messages/errorHandler';


@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        routing,
        ReCaptchaModule,
        MessageModule,
        AngularMaterialDesignModule,
        BrowserAnimationsModule,
        ProjectsModule,
        PortalModule
    ],
    declarations: [
        AppComponent,
        LoginComponent,
        CaptchaComponent,
        NavbarComponent,
        InputAutofocusDirective,
    ],
    providers: [
        AuthService,
        AuthGuardLoginService,
        RequestService,
        { provide: REST_URI, useValue: 'http://localhost:2038/' },
        { provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher },
        { provide: LOCALE_ID, useValue: 'ru' },
        { provide: ErrorHandler, useClass: MessageErrorHandler }
    ],
    bootstrap: [
        AppComponent,
        MessageComponent
    ]
})
export class AppModule {

}