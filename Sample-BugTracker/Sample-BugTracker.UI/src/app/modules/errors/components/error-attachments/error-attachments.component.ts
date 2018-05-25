import * as moment from 'moment';
import { FileUpload } from 'primeng/fileupload';

import { Component, Inject, Input, OnInit, ViewChild, EventEmitter, Output } from '@angular/core';

import { ERROR_ATTACHMENT_URI } from '../../../../app.component';
import { REST_URI } from '../../../shared/services/httpClient.service';
import { MessageService } from '../../../shared/services/message.service';
import { ErrorAttachment } from '../../models/error-attachment.model';
import { ErrorAttachmentService } from '../../services/error-attachment.service';
import { AttachmentsComponent } from '../attachments/attachments.component';

@Component({
  selector: 'app-error-attachments',
  templateUrl: './error-attachments.component.html',
  styles: [".upload-button-and-spinner-container {display: flex; align-items: center; justify-content: flex-start;}"]
})
export class ErrorAttachmentsComponent implements OnInit {

  isUploaded: boolean = false;
  @Input() errorId: number;
  @ViewChild("fileUploader") _fileUploader: FileUpload;
  @ViewChild("attachments") attachments: AttachmentsComponent;


  constructor(
    public messageService: MessageService,
    @Inject(REST_URI) public uri: string,
    public errorAttachSrv: ErrorAttachmentService,
  ) { }

  ngOnInit() {
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

  errorAttachmentUploader(event) {
    let files = event.files as File[];
    if (files.length > 0) {
      this.isUploaded = true;
      let formData = new FormData();
      for (let file of files) {
        formData.append('errorAttachments[]', file, file.name);
      }
      this._fileUploader.clear();
      this.errorAttachSrv.add(this.errorId, formData).toPromise().then((attachments: ErrorAttachment[]) => {
        this.isUploaded = false;
        this.attachments.pushAttachments(attachments);
        this.messageService.showSnackBarMsg(`Вложени${event.files.length == 1 ? 'е' : 'я'} успешно добавлены`);
      });
    }
  }
}