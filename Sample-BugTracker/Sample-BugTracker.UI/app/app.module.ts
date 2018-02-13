import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { routing } from './app.routing';
import { HttpModule } from "@angular/http";
import { AuthService } from "./services/auth.service";

@NgModule({
    imports: [BrowserModule, FormsModule, HttpModule, routing],
    declarations: [
        AppComponent,
        LoginComponent
    ],
    providers: [AuthService],
    bootstrap: [AppComponent]
})
export class AppModule {
    
}