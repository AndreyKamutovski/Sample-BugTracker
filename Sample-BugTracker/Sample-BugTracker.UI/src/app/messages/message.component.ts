import { Component, Inject } from "@angular/core";
import { MessageService } from "./message.service";
import { Message } from "./message.model";
import { MatDialog, MAT_DIALOG_DATA } from "@angular/material";
@Component({
    selector: "paMessages",
    moduleId: module.id,
    template: ''
})
export class MessageComponent {
    lastMessage: Message;
    private isOpenDialog: boolean = false;

    constructor(messageService: MessageService, private dialog: MatDialog) {
        messageService.registerMessageHandler(m => {
            this.lastMessage = m;
            if (!this.isOpenDialog) {
                this.isOpenDialog = true;
                console.log('modal');
                this.openDialog();
            }
        });
    }

    openDialog(): void {
        let dialogRef = this.dialog.open(ErrorDialog, {
            width: '50%',
            data: { lastMsg: this.lastMessage }
        });

        dialogRef.afterClosed().subscribe(result => {
            this.isOpenDialog = false;
        });
    }
}


@Component({
    selector: 'app-error-dialog',
    templateUrl: './app-error-dialog.component.html'
})
export class ErrorDialog {

    constructor( @Inject(MAT_DIALOG_DATA) public data: Message) { }
}