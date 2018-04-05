import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AngularMaterialDesignModule } from '../angular-material-design/angular-material-design.module';
import { ErrorDialog, MessageComponent } from './message.component';
import { MessageService } from './message.service';

@NgModule({
    imports: [
        BrowserModule,
        AngularMaterialDesignModule,
    ],
    declarations: [
        MessageComponent,
        ErrorDialog
    ],
    exports: [MessageComponent],
    entryComponents: [
        ErrorDialog,
    ],
    providers: [MessageService]
})
export class MessageModule { }