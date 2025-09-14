import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User, UserRegister } from '../models/User';
import { Token } from '../models/Token';

const { apiUrl } = environment;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly url: string = `${apiUrl}/auth`;

  constructor(private readonly http: HttpClient) {}

  public register(user: UserRegister): Observable<any> {
    return this.http.post(`${this.url}/register`, user);
  }

  public login(user: User): Observable<Token> {
    return this.http.post<Token>(`${this.url}/login`, user);
  }
}
