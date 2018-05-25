import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';

import { MessageService } from '../../../shared/services/message.service';
import { AttachmentOperations } from '../../interfaces/attachment-operations';
import { ErrorAttachment } from '../../models/error-attachment.model';
import { AttachmentPreviewService } from '../../services/attachment-preview.service';
import { ConfirmAttachmentDeleteComponent } from '../confirm-attachment-delete/confirm-attachment-delete.component';
import { WarningDialogComponent } from '../../../shared/components/warning-dialog/warning-dialog.component';

@Component({
  selector: 'app-attachments',
  templateUrl: './attachments.component.html',
  // styles: ['.error-attachment-card {height: 140px;}']
})
export class AttachmentsComponent implements OnInit {

  @Input() attachmentsService: AttachmentOperations;
  attachmentsError: ErrorAttachment[] = [];
  _fileTypeIconsFolder: string = "../../../../../assets/file-types-icons";

  constructor(
    public sanitizer: DomSanitizer,
    public dialog: MatDialog,
    public messageService: MessageService,
    private attachPreviewSrv: AttachmentPreviewService
  ) { }

  ngOnInit() {
  }

  pushAttachments(_attachmentsError: ErrorAttachment[]): void {
    for (let attach of _attachmentsError) {
      this.setFilePreviewSrc(attach);
      this.attachmentsError.push(attach);
    }
  }

  setFilePreviewSrc(attachment: ErrorAttachment): void {
    if (attachment.PreviewFilePath == null) {
      if (this.attachPreviewSrv.isImage(attachment.FileName)) {
        this.attachmentsService.download(attachment.Id).toPromise().then(res => {
          let url = URL.createObjectURL(res.blob());
          attachment.PreviewFilePath = this.sanitizer.bypassSecurityTrustUrl(url);
        });
      }
      else {
        attachment.PreviewFilePath = `${this._fileTypeIconsFolder}/${this.attachPreviewSrv.getFilePreview(attachment.FileName)}`;
      }
    }
  }

  download(attachment: ErrorAttachment) {
    this.attachmentsService.download(attachment.Id).subscribe(res => {
      var url = URL.createObjectURL(res.blob());
      var a = document.createElement('a');
      document.body.appendChild(a);
      a.setAttribute('style', 'display: none');
      a.href = url;
      a.download = attachment.OriginalFileName;
      a.click();
      URL.revokeObjectURL(url);
      a.remove();
    });
  }

  delete(id: number) {
    let confirmDeletionDialog = this.dialog.open(WarningDialogComponent, {
      width: '50%',
      data: { 'dialogBody': 'Удалить вложение?' }
    });
    confirmDeletionDialog.afterClosed().toPromise().then(isDel => {
      if (isDel) {
        this.attachmentsService.delete(id).toPromise().then(r => {
          let inx = this.attachmentsError.findIndex(p => p.Id == id);
          this.attachmentsError.splice(inx, 1);
          this.messageService.showSnackBarMsg("Вложение успешно удалено");
        });
      }
    }
    );
  }
}