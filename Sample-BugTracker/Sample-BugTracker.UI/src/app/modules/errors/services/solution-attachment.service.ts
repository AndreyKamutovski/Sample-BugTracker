import { Observable } from 'rxjs/Observable';

import { Injectable } from '@angular/core';
import { RequestMethod, ResponseContentType } from '@angular/http';

import { HttpClientService } from '../../shared/services/httpClient.service';
import { AttachmentOperations } from '../interfaces/attachment-operations';
import { ErrorAttachment } from '../models/error-attachment.model';

@Injectable()
export class SolutionAttachmentService implements AttachmentOperations {

  private readonly routerPrefix: string = "api/solution/attachment";

  constructor(
    private HttpClientService: HttpClientService    
  ) { }

  get(id: number): Observable<ErrorAttachment[]> {
    return this.HttpClientService.sendRequest(RequestMethod.Get, `${this.routerPrefix}`, { 'solutionId': id });
  }
  add(id: number, formData: FormData): Observable<ErrorAttachment[]> {
    return this.HttpClientService.sendRequest(RequestMethod.Post, `${this.routerPrefix}`, { 'solutionId': id }, null, formData);
  }
  delete(id: number): Observable<any> {
    return this.HttpClientService.sendRequest(RequestMethod.Delete, `${this.routerPrefix}/${id}`);
  }
  download(id: number): Observable<Response> {
    return this.HttpClientService.sendRequest(RequestMethod.Get, `${this.routerPrefix}/${id}/download`, null, null, null, ResponseContentType.Blob, false);
  }
}