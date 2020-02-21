import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/interfaces/User';

@Injectable({
  providedIn: 'root'
})

export class RegisterService {
  baseUrl = "http://localhost:8080/app/";

  constructor(
    private http: HttpClient
  ) { }

  registerUser(user: User) {
    return this.http.post(this.baseUrl + "register", user);
  }

  getUsers() {
    return this.http.get(this.baseUrl + "getPersons");
  }
}
