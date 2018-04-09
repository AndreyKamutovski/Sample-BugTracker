import { Injectable } from '@angular/core';
import { RequestMethod } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { HttpClientService } from '../shared/services/httpClient.service';
import { User } from '../shared/models/user.model';

@Injectable()
export class SignupService {

  constructor(private HttpClientService: HttpClientService) { }

  public checkEmailNotTaken(email: string): Observable<boolean> {
    return this.HttpClientService.sendRequest(RequestMethod.Get, 'api/User', { 'email': email });
  }

  public confirmPassword(user: User, projectId: number) {
    return this.HttpClientService.sendRequest(RequestMethod.Post, 'api/User', { 'email': email });
  }
}
