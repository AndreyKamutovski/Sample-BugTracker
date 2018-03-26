import { Injectable } from "@angular/core";
import { Message } from "./message.model";
import { MatSnackBar, MatSnackBarConfig } from "@angular/material";

@Injectable()
export class MessageService {
    private handler: (m: Message) => void;

    constructor() { }

    public reportMessage(msg: Message) {
        if (this.handler != null) {
            this.handler(msg);
        }
    }

    public reportSnackBarMessage(message: string, action: string = "", config: MatSnackBarConfig<any> = { duration: 2000 }) {
        // this.snackBar.open(message, action, config);
    }

    public registerMessageHandler(handler: (m: Message) => void) {
        this.handler = handler;
    }
}