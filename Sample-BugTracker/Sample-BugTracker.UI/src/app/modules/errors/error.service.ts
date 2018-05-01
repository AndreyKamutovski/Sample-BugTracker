import { Injectable } from '@angular/core';
import { RequestMethod } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { HttpClientService } from '../../shared/services/httpClient.service';
import { SolutionErrorFormComponent } from './components/solution-error-form/solution-error-form.component';
import { ErrorBT } from './models/error.model';

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
}
