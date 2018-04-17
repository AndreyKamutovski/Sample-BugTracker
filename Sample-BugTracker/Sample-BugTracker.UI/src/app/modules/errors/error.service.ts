import { Injectable } from '@angular/core';
import { RequestMethod } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { HttpClientService } from '../../shared/services/httpClient.service';
import { ErrorBT } from './models/error.model';

@Injectable()
export class ErrorService {

  public status = [
    { value: 1, viewValue: 'Открыто', color: "" },
    { value: 2, viewValue: 'Решено', color: "" },
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
    console.log('addError serv');
    console.log('err', error);

    
    return this.HttpClientService.sendRequest(RequestMethod.Post, 'api/Error', null, { 'Content-Type': 'application/json' }, error);
  }
}
