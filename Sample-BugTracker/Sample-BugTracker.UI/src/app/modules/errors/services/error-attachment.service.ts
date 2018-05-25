import { Injectable } from '@angular/core';
import { RequestMethod, ResponseContentType } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { HttpClientService } from '../../shared/services/httpClient.service';
import { AttachmentOperations } from '../interfaces/attachment-operations';
import { ErrorAttachment } from '../models/error-attachment.model';


@Injectable()
export class ErrorAttachmentService implements AttachmentOperations {

  private readonly routerPrefix: string = "api/error/attachment";

  constructor(
    private HttpClientService: HttpClientService
  ) { }

  get(id: number): Observable<ErrorAttachment[]> {
    return this.HttpClientService.sendRequest(RequestMethod.Get, `${this.routerPrefix}`, { 'errorId': id });
  }
  add(id: number, formData: FormData): Observable<ErrorAttachment[]> {
    return this.HttpClientService.sendRequest(RequestMethod.Post, `${this.routerPrefix}`, { 'errorId': id }, null, formData);
  }
  delete(id: number): Observable<any> {
    return this.HttpClientService.sendRequest(RequestMethod.Delete, `${this.routerPrefix}/${id}`);
  }
  download(id: number): Observable<Response> {
    return this.HttpClientService.sendRequest(RequestMethod.Get, `${this.routerPrefix}/${id}/download`, null, null, null, ResponseContentType.Blob, false);
  }
}