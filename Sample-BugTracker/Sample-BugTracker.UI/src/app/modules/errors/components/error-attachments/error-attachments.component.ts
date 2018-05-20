import { Component, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material';
import * as moment from 'moment';
import { FileUpload } from 'primeng/fileupload';

import { ERROR_ATTACHMENT_URI } from '../../../../app.component';
import { REST_URI } from '../../../shared/services/httpClient.service';
import { MessageService } from '../../../shared/services/message.service';
import { ErrorAttachment } from '../../models/error-attachment.model';
import { ErrorAttachmentService } from '../../services/error-attachment.service';
import { ConfirmAttachmentDeleteComponent } from '../confirm-attachment-delete/confirm-attachment-delete.component';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-error-attachments',
  templateUrl: './error-attachments.component.html',
  styles: ['error-attachment-card {height: 140px;}']
})
export class ErrorAttachmentsComponent implements OnInit {

  //  attachmentsError: ErrorAttachment[] = [];
   urlToUpload: string;
   isDataLoaded: boolean = false;
  @Input()  errorId: number;
  attachmentsError: ErrorAttachment[] = [];

  @ViewChild("fileUploader")  _fileUploader: FileUpload;

  constructor(
    public dialog: MatDialog,
    public messageService: MessageService,
    @Inject(REST_URI) public uri: string,
    @Inject(ERROR_ATTACHMENT_URI) public errorAttachUri: string,
    public errorAttachmentService: ErrorAttachmentService,
    public sanitizer: DomSanitizer
  ) {

   }

  ngOnInit() {
    this.urlToUpload = `${this.uri}api/attachment?errorId=${this.errorId}`;
        this.errorAttachmentService.getAttachments(this.errorId).then(a => {
      this.attachmentsError = a;
      for (let attach of this.attachmentsError) {
        attach.PreviewFilePath = this.getFilePreviewSrc(attach);
      }
    });
  }

  onSelectAttachment(event) {
    let uploadFiles = this._fileUploader.files;
    for (let i = 0; i < uploadFiles.length; i++) {
      for (let attachErrorFile of this.attachmentsError) {
        if (attachErrorFile.OriginalFileName == uploadFiles[i].name) {
          uploadFiles.splice(i, 1);
          i--; break;
        }
      }
    }
    if (this._fileUploader.files.length > 0) {
      this._fileUploader.upload();
    }
    else {
      this.messageService.showSnackBarMsg(`Выбранный(е) файл(ы) уже прикреплен(ы)`);
    }
  }

  getAttachmentFormatDate(date: Date): string {
    return moment.utc(date).local().format("DD-MM-YYYY hh:mm A");
  }

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
        v.PreviewFilePath = this.getFilePreviewSrc(v);        
        this.attachmentsError.push(v);
      });
      this.messageService.showSnackBarMsg("Вложение(я) успешно добавлены");
    }
  }

  getDownloadLink(id: number): string {
    return `${this.uri}api/attachment/${id}/download`;
  }

   _imageFileFormats: string[] = [
    "tiff",
    "gif",
    "jpg",
    "jpeg",
    "bmp",
    "png",
    "svg"
  ];

  //  _preparedFileTypeIcons: string[] = [
  //   "after-effects.png",
  //   "ai.png",
  //   "audition.png",
  //   "avi.png",
  //   "bridge.png",
  //   "css.png",
  //   "csv.png",
  //   "dbf.png",
  //   'doc.png',
  //   'docx.png',
  //   "dreamweaver.png",
  //   "dwg.png",
  //   "exe.png",
  //   "file.png",
  //   "filenames.txt",
  //   "fireworks.png",
  //   "fla.png",
  //   "flash.png",
  //   "html.png",
  //   "illustrator.png",
  //   "indesign.png",
  //   "iso.png",
  //   "javascript.png",
  //   "jpg.png",
  //   "json-file.png",
  //   "mp3.png",
  //   "mp4.png",
  //   "pdf.png",
  //   "photoshop.png",
  //   "png.png",
  //   "ppt.png",
  //   "prelude.png",
  //   "premiere.png",
  //   "psd.png",
  //   "rtf.png",
  //   "search.png",
  //   "svg.png",
  //   "txt.png",
  //   "xls.png",
  //   "xml.png",
  //   "zip-1.png",
  //   "zip.png"
  // ];

   _fileTypeIconsFolder: string = "../../../../../assets/file-types-icons";



  //  isImage(attachment: ErrorAttachment): boolean {
  //   return this._imageFileFormats.includes(this.getFileExtension(attachment.FileName));
  // }

  //  getFileExtension(fileName: string): string {
  //   return fileName.substr(fileName.lastIndexOf('.') + 1).toLowerCase();
  // }

  getFilePreviewSrc(attachment: ErrorAttachment): string {
    if (this.errorAttachmentService.isImage(attachment.FileName)) {
      this.errorAttachmentService.download(attachment.Id).toPromise().then(res => {
        let url = URL.createObjectURL(res.blob());
        attachment.PreviewFilePath = this.sanitizer.bypassSecurityTrustUrl(url);
      });
    }
    else {
      return `${this._fileTypeIconsFolder}/${this.errorAttachmentService.getFilePreview(attachment.FileName)}`;
    }
  }

  download(attachment: ErrorAttachment) {
    this.errorAttachmentService.download(attachment.Id).subscribe(res => {
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
    let confirmDeletionDialog = this.dialog.open(ConfirmAttachmentDeleteComponent, {
      width: '50%'
    });
    confirmDeletionDialog.afterClosed().toPromise().then(isDel => {
      if (isDel) {
        this.errorAttachmentService.delete(id).then(r => {
          let inx = this.attachmentsError.findIndex(p => p.Id == id);
          this.attachmentsError.splice(inx, 1);
          this.messageService.showSnackBarMsg("Вложение успешно удалено");
        });
      }
    }
    );
  }
}
