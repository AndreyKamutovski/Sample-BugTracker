import { Injectable, Inject } from '@angular/core';
import { Http } from '@angular/http';
import { REST_URI } from './auth.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class SignupService {

  constructor(private http: Http, @Inject(REST_URI) private uri: string) { }

  public checkEmailNotTaken(email: string): Observable<boolean> {
    return this.http.get(`${this.uri}api/Account`, { params: { 'email': email } })
      .map(response => {
        return response.json();
      }).catch((error: any) => {
        return Observable.throw('Error: ' + error.statusText + ' ' + error.status);
      });
  }
}
