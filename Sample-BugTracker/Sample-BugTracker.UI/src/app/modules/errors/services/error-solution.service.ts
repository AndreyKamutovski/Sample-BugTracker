import { Injectable } from '@angular/core';
import { RequestMethod } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { HttpClientService } from '../../shared/services/httpClient.service';
import { ErrorAttachment } from '../models/error-attachment.model';
import { ErrorSolution } from '../models/error-solution.model';

@Injectable()
export class ErrorSolutionService {

  private readonly routerPrefix: string = "api/solution";

  constructor(private HttpClientService: HttpClientService) { }

  addSolution(errorId: number, solution: ErrorSolution): Observable<ErrorSolution> {
    return this.HttpClientService.sendRequest(RequestMethod.Post, `${this.routerPrefix}`, { "errorId": errorId }, { 'Content-Type': 'application/json' }, solution);
  }
}
