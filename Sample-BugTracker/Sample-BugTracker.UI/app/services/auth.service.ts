import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import { User } from "../shared/models/user.model";
  
@Injectable()
export class AuthService {
  
    constructor(private http: Http){ }
      
    login(user: User){
        const body = {userName: user.email, password: user.password, grant_type: 'password'};
        return this.http.post('', get(('user.json'))
    }
}