import { LOCALE_ID, NgModule } from '@angular/core';
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
import { ProjectsModule } from './projects/projects.module';
import { AuthGuardLoginService } from './services/auth-guard-login.service';
import { AuthService, REST_URI } from './services/auth.service';



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
        ProjectsModule
    ],
    declarations: [
        AppComponent,
        LoginComponent,
        CaptchaComponent,
        NavbarComponent,
    ],
    providers: [
        AuthService,
        AuthGuardLoginService,
        { provide: REST_URI, useValue: 'http://localhost:2038/' },
        { provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher },
        { provide: LOCALE_ID, useValue: 'ru' }
    ],
    bootstrap: [
        AppComponent,
        MessageComponent
    ]
})
export class AppModule {

}