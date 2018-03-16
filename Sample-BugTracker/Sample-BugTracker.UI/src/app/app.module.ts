import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { ReCaptchaModule } from 'angular2-recaptcha';

import { AppComponent } from './app.component';
import { routing } from './app.routing';
import { CaptchaComponent } from './captcha/captcha.component';
import { LoginComponent } from './login/login.component';
import { MessageComponent } from './messages/message.component';
import { MessageModule } from './messages/message.module';
import { ProjectComponent } from './project/project.component';
import { AuthService, REST_URI } from './services/auth.service';
import { ProjectService } from './services/project.service';
import { AngularMaterialDesignModule } from "./angular-material-design/angular-material-design.module";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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
        BrowserAnimationsModule
    ],
    declarations: [
        AppComponent,
        LoginComponent,
        CaptchaComponent,
        ProjectComponent
    ],
    providers: [
        AuthService,
        ProjectService,
        { provide: REST_URI, useValue: 'http://localhost:2038/' }
    ],
    bootstrap: [
        AppComponent,
        MessageComponent
    ]
})
export class AppModule {

}