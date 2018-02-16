import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { routing } from './app.routing';
import { HttpModule } from "@angular/http";
import { AuthService, REST_URI } from "./services/auth.service";

@NgModule({
    imports: [BrowserModule, FormsModule, HttpModule, routing],
    declarations: [
        AppComponent,
        LoginComponent
    ],
    //providers: [AuthService, { provide: REST_URI, useValue: 'http://${location.hostname}:2038/' }],
    bootstrap: [AppComponent]
})
export class AppModule {
    
}