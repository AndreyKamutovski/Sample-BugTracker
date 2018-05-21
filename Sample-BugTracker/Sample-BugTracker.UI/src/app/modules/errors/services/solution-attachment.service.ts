import { Injectable } from '@angular/core';
import { AttachmentOperations } from '../interfaces/attachment-operations';
import { Observable } from 'rxjs/Observable';
import { ErrorAttachment } from '../models/error-attachment.model';
import { HttpClientService } from '../../shared/services/httpClient.service';
import { RequestMethod } from '@angular/http';

@Injectable()
export class SolutionAttachmentService implements AttachmentOperations {

  private readonly routerPrefix: string = "api/solution/attachment";

  constructor(
    private HttpClientService: HttpClientService    
  ) { }

  get(id: number): Observable<ErrorAttachment[]> {
    throw new Error("Method not implemented.");
  }
  add(id: number, formData: FormData): Observable<ErrorAttachment[]> {
    return this.HttpClientService.sendRequest(RequestMethod.Post, `${this.routerPrefix}`, { 'solutionId': id }, null, formData);
  }
  delete(id: number): Observable<any> {
    throw new Error("Method not implemented.");
  }
  download(id: number): Observable<Response> {
    throw new Error("Method not implemented.");
  }
}