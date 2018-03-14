import { ErrorHandler, Injectable } from '@angular/core';

import { Message } from './message.model';
import { MessageService } from './message.service';

@Injectable()
export class MessageErrorHandler implements ErrorHandler {
    constructor(private messageService: MessageService) {
    }

    handleError(error: any) {
        let msg = error instanceof Error ? error.message : error.toString();
        setTimeout(() => this.messageService
            .reportMessage(new Message(msg, true)), 0);
    }
}