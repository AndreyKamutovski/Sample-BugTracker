import { Injectable } from '@angular/core';
import { RequestMethod } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { HttpClientService } from '../../shared/services/httpClient.service';
import { ErrorBT } from './models/error.model';
import { UpdateErrorResponsibleBT } from './models/update-error-responsible.model';
import { UpdateErrorDeadlineBT } from './models/update-error-deadline.model';
import { SolutionErrorFormComponent } from './components/solution-error-form/solution-error-form.component';

@Injectable()
export class ErrorService {

  public status = [
    { value: 1, viewValue: 'Открыто', color: "" },
    { value: 2, viewValue: 'Выполняется', color: "" },
    { value: 3, viewValue: 'Необходимо протестировать', color: "" },
    { value: 4, viewValue: 'Закрыто', color: "" },
  ];

  public priorities = [
    { value: 1, viewValue: 'Критический', color: "" },
    { value: 2, viewValue: 'Высокий', color: "" },
    { value: 3, viewValue: 'Средний', color: "" },
    { value: 4, viewValue: 'Низкий', color: "" },
  ];

  public classification = [
    { value: 1, viewValue: 'Безопасность', color: "" },
    { value: 2, viewValue: 'Сбой/зависание', color: "" },
    { value: 3, viewValue: 'Потеря данных', color: "" },
    { value: 4, viewValue: 'Производительность', color: "" },
    { value: 5, viewValue: 'Пользовательский интерфейс', color: "" },
    { value: 6, viewValue: 'Другая ошибка', color: "" },
  ];

  constructor(private HttpClientService: HttpClientService) { }

  getProjectErrors(projectId: number): Observable<ErrorBT> {
    return this.HttpClientService.sendRequest(RequestMethod.Get, 'api/Error', { 'projectId': projectId });
  }

  addError(error: ErrorBT): Observable<ErrorBT> {
    return this.HttpClientService.sendRequest(RequestMethod.Post, 'api/Error/Add', null, { 'Content-Type': 'application/json' }, error);
  }

  addSolution(solution: SolutionErrorFormComponent): Observable<SolutionErrorFormComponent> {
    return this.HttpClientService.sendRequest(RequestMethod.Post, 'api/Error/AddSolution', null, { 'Content-Type': 'application/json' }, solution);
  }

  updateError(error: ErrorBT): Observable<ErrorBT> {
    return this.HttpClientService.sendRequest(RequestMethod.Put, 'api/Error', null, { 'Content-Type': 'application/json' }, error);
  }

  updateErrorResponsible(errorResponsible: UpdateErrorResponsibleBT): Observable<UpdateErrorResponsibleBT> {
    return this.HttpClientService.sendRequest(RequestMethod.Post, 'api/Error/UpdateErrorResponsible', null, { 'Content-Type': 'application/json' }, errorResponsible);
  }

  updateErrorDeadline(errorDeadline: UpdateErrorDeadlineBT): Observable<UpdateErrorDeadlineBT> {
    return this.HttpClientService.sendRequest(RequestMethod.Post, 'api/Error/UpdateErrorDeadline', null, { 'Content-Type': 'application/json' }, errorDeadline);
  }

  updateErrorStatus(errorStatus: any): Observable<any> {
    return this.HttpClientService.sendRequest(RequestMethod.Post, 'api/Error/UpdateErrorStatus', null, { 'Content-Type': 'application/json' }, errorStatus);
  }

  updateErrorPriority(errorPriority: any): Observable<any> {
    return this.HttpClientService.sendRequest(RequestMethod.Post, 'api/Error/UpdateErrorPriority', null, { 'Content-Type': 'application/json' }, errorPriority);
  }

  updateErrorClassification(errorClassification: any): Observable<any> {
    return this.HttpClientService.sendRequest(RequestMethod.Post, 'api/Error/UpdateErrorClassification', null, { 'Content-Type': 'application/json' }, errorClassification);
  }


}
