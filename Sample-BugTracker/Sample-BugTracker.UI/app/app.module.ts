import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { routing } from './app.routing';
import { HttpModule } from "@angular/http";
import { AuthService, REST_URI } from "./services/auth.service";
import { CaptchaComponent } from './captcha/captcha.component';
import { ReCaptchaModule } from 'angular2-recaptcha';
import { ProjectComponent } from "./project/project.component";
import { MessageModule } from "./messages/message.module";
import { MessageComponent } from "./messages/message.component";
import { ProjectService } from "./services/project.service";

@NgModule({
    imports: [BrowserModule, FormsModule, HttpModule, routing, ReCaptchaModule, MessageModule],
    declarations: [
        AppComponent,
        LoginComponent,
        CaptchaComponent,
        ProjectComponent
    ],
    providers: [AuthService, { provide: REST_URI, useValue: 'http://${location.hostname}:2038/' }],
    bootstrap: [AppComponent, MessageComponent]
})
export class AppModule {

}