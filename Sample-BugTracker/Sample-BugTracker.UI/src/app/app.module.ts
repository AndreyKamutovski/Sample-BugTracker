import 'chart.js/dist/Chart.min.js';

import { ErrorHandler, LOCALE_ID, NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { ErrorStateMatcher, ShowOnDirtyErrorStateMatcher } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReCaptchaModule } from 'angular2-recaptcha';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent, ERROR_ATTACHMENT_URI } from './app.component';
import { LoaderComponent } from './modules/loader/loader.component';
import { LoaderModule } from './modules/loader/loader.module';
import { AuthGuard } from './modules/projects/guards/auth-guard-login.service';
import { CaptchaComponent } from './modules/shared/components/captcha/captcha.component';
import {
    GlobalErrorHandlerComponent,
} from './modules/shared/components/global-error-handler/global-error-handler.component';
import { GlobalErrorHandlerService } from './modules/shared/components/global-error-handler/global-error-handler.service';
import { LoginFormComponent } from './modules/shared/components/login-form/login-form.component';
import { REST_URI } from './modules/shared/services/httpClient.service';
import { PermissionService } from './modules/shared/services/permission.service';
import { QuillEditorConfigurationService } from './modules/shared/services/quill-editor-configuration.service';
import { SharedModule } from './modules/shared/shared.module';
import { AuthGuardLogoutService } from './modules/users/guards/auth-guard-logout.service';

@NgModule({
    imports: [
        BrowserAnimationsModule, 
        SharedModule.forRoot(), 
        HttpModule,
        ReCaptchaModule,
        LoaderModule,
        AppRoutingModule
    ],
    declarations: [
        AppComponent,
        CaptchaComponent,
        GlobalErrorHandlerComponent,
        LoginFormComponent
    ],
    entryComponents: [
        GlobalErrorHandlerComponent,
    ],
    providers: [
        AuthGuard,
        AuthGuardLogoutService,
        PermissionService,
        QuillEditorConfigurationService,
        { provide: REST_URI, useValue: 'http://localhost:2038/' },
        // { provide: REST_URI, useValue: 'http://192.168.0.102:2038/' },
        { provide: ERROR_ATTACHMENT_URI, useValue: 'Content/ErrorAttachments/' },
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