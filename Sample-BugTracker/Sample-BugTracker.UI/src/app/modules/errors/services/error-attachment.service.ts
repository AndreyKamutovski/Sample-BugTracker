import { Injectable } from '@angular/core';
import { RequestMethod, Response, ResponseContentType } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { HttpClientService } from '../../shared/services/httpClient.service';
import { ErrorAttachment } from '../models/error-attachment.model';


@Injectable()
export class ErrorAttachmentService {

  private readonly routerPrefix: string = "api/attachment";
  private _imageFileFormats: string[] = [
    "tiff",
    "gif",
    "jpg",
    "jpeg",
    "bmp",
    "png",
    "svg"
  ];
  private _preparedFileTypeIcons: string[] = [
    "after-effects.png",
    "ai.png",
    "audition.png",
    "avi.png",
    "bridge.png",
    "css.png",
    "csv.png",
    "dbf.png",
    'doc.png',
    'docx.png',
    "dreamweaver.png",
    "dwg.png",
    "exe.png",
    "file.png",
    "filenames.txt",
    "fireworks.png",
    "fla.png",
    "flash.png",
    "html.png",
    "illustrator.png",
    "indesign.png",
    "iso.png",
    "javascript.png",
    "jpg.png",
    "json-file.png",
    "mp3.png",
    "mp4.png",
    "pdf.png",
    "photoshop.png",
    "png.png",
    "ppt.png",
    "prelude.png",
    "premiere.png",
    "psd.png",
    "rtf.png",
    "search.png",
    "svg.png",
    "txt.png",
    "xls.png",
    "xml.png",
    "zip-1.png",
    "zip.png"
  ];

  constructor(
    private HttpClientService: HttpClientService
  ) {

  }

  getAttachments(errorId: number): Promise<ErrorAttachment[]> {
    return this.HttpClientService.sendRequest(RequestMethod.Get, `${this.routerPrefix}`, { 'errorId': errorId }).toPromise();
  }

  delete(id: number): Promise<void> {
    return this.HttpClientService.sendRequest(RequestMethod.Delete, `${this.routerPrefix}/${id}`).toPromise();
  }

  download(id: number): Observable<Response> {
    return this.HttpClientService.sendRequest(RequestMethod.Get, `${this.routerPrefix}/${id}/download`, null, null, null, ResponseContentType.Blob, false);
  }

  isImage(fileName: string): boolean {
    return this._imageFileFormats.includes(this.getFileExtension(fileName));
  }

  getFileExtension(fileName: string): string {
    return fileName.substr(fileName.lastIndexOf('.') + 1).toLowerCase();
  }

  getFilePreview(fileName: string): string {
    let fileExtension = this.getFileExtension(fileName);
    if (this._preparedFileTypeIcons.includes(`${fileExtension}.png`)) {
      return `${fileExtension}.png`;
    }
    else {
      return `file.png`;
    }
  }
}