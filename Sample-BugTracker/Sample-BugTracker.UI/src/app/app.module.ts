import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { ReCaptchaModule } from 'angular2-recaptcha';
import { DpDatePickerModule } from 'ng2-date-picker';

import { AppComponent } from './app.component';
import { routing } from './app.routing';
import { CaptchaComponent } from './captcha/captcha.component';
import { LoginComponent } from './login/login.component';
import { MessageComponent } from './messages/message.component';
import { MessageModule } from './messages/message.module';
import { ProjectComponent } from './project/project.component';
import { AuthService, REST_URI } from './services/auth.service';
import { ProjectService } from './services/project.service';

@NgModule({
    imports: [BrowserModule, FormsModule, HttpModule, routing, ReCaptchaModule, MessageModule, DpDatePickerModule],
    declarations: [
        AppComponent,
        LoginComponent,
        CaptchaComponent,
        ProjectComponent
    ],
    providers: [AuthService, ProjectService, { provide: REST_URI, useValue: 'http://localhost:2038/' }],
    bootstrap: [AppComponent, MessageComponent]
})
export class AppModule {

}