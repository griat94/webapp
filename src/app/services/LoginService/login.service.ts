import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginUser } from 'src/app/interfaces/LoginUser';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  baseUrl = "http://localhost:8080/app/";

  constructor(
    private http: HttpClient
  ) { }

  tryLogin(loginUser: LoginUser) {
    return this.http.post(this.baseUrl + "login", loginUser);
  }
}
