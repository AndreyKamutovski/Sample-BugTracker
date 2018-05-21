import { Component, Inject, Input, OnInit, ViewChild } from '@angular/core';
import * as moment from 'moment';
import { FileUpload } from 'primeng/fileupload';

import { ERROR_ATTACHMENT_URI } from '../../../../app.component';
import { REST_URI } from '../../../shared/services/httpClient.service';
import { MessageService } from '../../../shared/services/message.service';
import { ErrorAttachment } from '../../models/error-attachment.model';
import { ErrorAttachmentService } from '../../services/error-attachment.service';
import { AttachmentsComponent } from '../attachments/attachments.component';


@Component({
  selector: 'app-error-attachments',
  templateUrl: './error-attachments.component.html',
})
export class ErrorAttachmentsComponent implements OnInit {

  urlToUpload: string;
  @Input() errorId: number;

  @ViewChild("fileUploader") _fileUploader: FileUpload;
  @ViewChild("attachments") attachments: AttachmentsComponent;

  constructor(
    public messageService: MessageService,
    @Inject(REST_URI) public uri: string,
    public errorAttachSrv: ErrorAttachmentService,
  ) { }

  ngOnInit() {
    this.urlToUpload = `${this.uri}api/error/attachment?errorId=${this.errorId}`;
    this.errorAttachSrv.get(this.errorId).toPromise().then(a => {
      this.attachments.pushAttachments(a);
    });
  }

  // onSelectAttachment(event) {
  //   let uploadFiles = this._fileUploader.files;
  //   for (let i = 0; i < uploadFiles.length; i++) {
  //     for (let attachErrorFile of this.attachmentsError) {
  //       if (attachErrorFile.OriginalFileName == uploadFiles[i].name) {
  //         uploadFiles.splice(i, 1);
  //         i--; break;
  //       }
  //     }
  //   }
  //   if (this._fileUploader.files.length > 0) {
  //     this._fileUploader.upload();
  //   }
  //   else {
  //     this.messageService.showSnackBarMsg(`Выбранный(е) файл(ы) уже прикреплен(ы)`);
  //   }
  // }

  onBeforeSendAttachment(event) {
    let xhr = event.xhr as XMLHttpRequest;
    if (xhr != null) {
      xhr.setRequestHeader('Authorization', `Bearer ${sessionStorage.getItem('token')}`);
    }
  }

  onUploadAttachment(event) {
    let resAttachment = JSON.parse(event.xhr.response) as ErrorAttachment[];
    if (resAttachment) {
      resAttachment.forEach((v, i, array) => {
        this.attachments.pushAttachments(resAttachment);
        // this.attachmentsError.push(v);
      });
      this.messageService.showSnackBarMsg("Вложение(я) успешно добавлены");
    }
  }
}