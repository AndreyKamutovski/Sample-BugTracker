import { Injectable } from '@angular/core';
import { RequestMethod } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { HttpClientService } from '../../shared/services/httpClient.service';


@Injectable()
export class SignupService {

  constructor(private HttpClientService: HttpClientService) { }

  public IsEmailAvailable(email: string): Observable<boolean> {
    return this.HttpClientService.sendRequest(RequestMethod.Get, 'api/user', { 'email': email });
  }
}
