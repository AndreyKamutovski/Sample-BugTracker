import { Component } from "@angular/core";
import { MessageService } from "./message.service";
import { Message } from "./message.model";
@Component({
    selector: "paMessages",
    moduleId: module.id,
    templateUrl: "message.component.html",
})
export class MessageComponent {
    lastMessage: Message;
    
    constructor(messageService: MessageService) {
        messageService.registerMessageHandler(m => { this.lastMessage = m; this.show(); });
    }

    public visible = false;
    public visibleAnimate = false;

    public show(): void {
        this.visible = true;
        setTimeout(() => this.visibleAnimate = true, 100);
    }

    public hide(): void {
        this.visibleAnimate = false;
        setTimeout(() => this.visible = false, 300);
    }

    public onContainerClicked(event: MouseEvent): void {
        if ((<HTMLElement>event.currentTarget).classList.contains('modal')) {
            this.hide();
        }
    }
}