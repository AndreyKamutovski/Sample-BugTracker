import { stagger } from '@angular/core/src/animation/dsl';
import { Injectable } from '@angular/core';
import { RequestMethod } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { HttpClientService } from '../../../shared/services/httpClient.service';
import { SolutionErrorFormComponent } from '../components/solution-error-form/solution-error-form.component';
import { ErrorBT } from '../models/error.model';
import { StatusList } from '../enums/status-list.enum';
import { PriorityList } from '../enums/priority-list.enum';
import { ClassificationList } from '../enums/classification-list.enum';

@Injectable()
export class ErrorService {

  private readonly routerPrefix: string = "api/error"; 

  constructor(private HttpClientService: HttpClientService) {}

  addError(projectId: number, error: ErrorBT): Observable<ErrorBT> {
    return this.HttpClientService.sendRequest(RequestMethod.Post, `${this.routerPrefix}`, { 'projectId': projectId }, { 'Content-Type': 'application/json' }, error);
  }

  addSolution(solution: SolutionErrorFormComponent): Observable<SolutionErrorFormComponent> {
    return this.HttpClientService.sendRequest(RequestMethod.Post, 'api/Error/AddSolution', null, { 'Content-Type': 'application/json' }, solution);
  }

  updateError(errorId: number, error: ErrorBT): Observable<ErrorBT> {
    return this.HttpClientService.sendRequest(RequestMethod.Put, `${this.routerPrefix}/${errorId}`, null, { 'Content-Type': 'application/json' }, error);
  }

  updateAssignee(errorId: number, email: string): Promise<any> {
    return this.HttpClientService.sendRequest(RequestMethod.Patch, `${this.routerPrefix}/${errorId}/assignee`, null, { 'Content-Type': 'application/json' }, {EmailAssignee: email}).toPromise();
  }

  updateDeadline(errorId: number, deadline: Date): Promise<Date> {
    return this.HttpClientService.sendRequest(RequestMethod.Patch, `${this.routerPrefix}/${errorId}/deadline`, null, { 'Content-Type': 'application/json' }, {Deadline: deadline}).toPromise();
  }

  updateStatus(errorId: number, status: StatusList): Promise<StatusList> {
    return this.HttpClientService.sendRequest(RequestMethod.Patch, `${this.routerPrefix}/${errorId}/status/${status}`).toPromise();
  }

  updatePriority(errorId: number, priority: PriorityList): Promise<PriorityList> {
    return this.HttpClientService.sendRequest(RequestMethod.Patch, `${this.routerPrefix}/${errorId}/priority/${priority}`).toPromise();
  }

  updateClassification(errorId: number, classification: ClassificationList): Promise<ClassificationList> {
    return this.HttpClientService.sendRequest(RequestMethod.Patch, `${this.routerPrefix}/${errorId}/classification/${classification}`).toPromise();
  }

  updateTitle(errorId: number, title: string): Promise<string> {
    return this.HttpClientService.sendRequest(RequestMethod.Patch, `${this.routerPrefix}/${errorId}/title`, null, { 'Content-Type': 'application/json' }, {Title: title}).toPromise();
  }

  updateDescription(errorId: number, description: string): Promise<string> {
    return this.HttpClientService.sendRequest(RequestMethod.Patch, `${this.routerPrefix}/${errorId}/description`, null, { 'Content-Type': 'application/json' }, {Description: description}).toPromise();
  }
}
