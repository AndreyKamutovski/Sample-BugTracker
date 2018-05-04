import { Injectable } from '@angular/core';
import { RequestMethod } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { HttpClientService } from '../../shared/services/httpClient.service';
import { SolutionErrorFormComponent } from './components/solution-error-form/solution-error-form.component';
import { ErrorBT } from './models/error.model';
import { StatusList } from '../../shared/enums/status-list.enum';
import { PriorityList } from '../../shared/enums/priority-list.enum';
import { ClassificationList } from '../../shared/enums/classification-list.enum';

@Injectable()
export class ErrorService {

  public status = [
    { value: StatusList.OPEN, viewValue: 'Открыто', color: "" },
    { value: StatusList.DECIDED, viewValue: 'Выполняется', color: "" },
    { value: StatusList.NECESSARYTEST, viewValue: 'Необходимо протестировать', color: "" },
    { value: StatusList.CLOSED, viewValue: 'Закрыто', color: "" },
  ];

  public priorities = [
    { value: PriorityList.CRITICAL, viewValue: 'Критический', color: "" },
    { value: PriorityList.HIGH, viewValue: 'Высокий', color: "" },
    { value: PriorityList.MIDDLE, viewValue: 'Средний', color: "" },
    { value: PriorityList.LOW, viewValue: 'Низкий', color: "" },
  ];

  public classification = [
    { value: ClassificationList.SECURITY, viewValue: 'Безопасность', color: "" },
    { value: ClassificationList.CRASHORHANG, viewValue: 'Сбой/зависание', color: "" },
    { value: ClassificationList.DATALOSS, viewValue: 'Потеря данных', color: "" },
    { value: ClassificationList.PERFORMANCE, viewValue: 'Производительность', color: "" },
    { value: ClassificationList.UI, viewValue: 'Пользовательский интерфейс', color: "" },
    { value: ClassificationList.OTHERERROR, viewValue: 'Другая ошибка', color: "" },
  ];

  private readonly routerPrefix: string = "api/error";

  constructor(private HttpClientService: HttpClientService) { }

  addError(projectId: number, error: ErrorBT): Observable<ErrorBT> {
    return this.HttpClientService.sendRequest(RequestMethod.Post, `${this.routerPrefix}`, { 'projectId': projectId }, { 'Content-Type': 'application/json' }, error);
  }

  addSolution(solution: SolutionErrorFormComponent): Observable<SolutionErrorFormComponent> {
    return this.HttpClientService.sendRequest(RequestMethod.Post, 'api/Error/AddSolution', null, { 'Content-Type': 'application/json' }, solution);
  }

  updateError(errorId: number, error: ErrorBT): Observable<ErrorBT> {
    return this.HttpClientService.sendRequest(RequestMethod.Put, `${this.routerPrefix}/${errorId}`, null, { 'Content-Type': 'application/json' }, error);
  }

  updateStatus(errorId: number, status: StatusList): Promise<StatusList> {
    return this.HttpClientService.sendRequest(RequestMethod.Patch, `${this.routerPrefix}/${errorId}/status/${status}`).toPromise();
  }

  updatePriority(errorId: number, priority: PriorityList): Observable<PriorityList> {
    return this.HttpClientService.sendRequest(RequestMethod.Patch, `${this.routerPrefix}/${errorId}/priority/${priority}`);
  }

  updateClassification(errorId: number, classification: ClassificationList): Observable<ClassificationList> {
    return this.HttpClientService.sendRequest(RequestMethod.Patch, `${this.routerPrefix}/${errorId}/classification/${classification}`);
  }  
}
