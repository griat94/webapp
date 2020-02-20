import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/interfaces/User';

@Injectable({
  providedIn: 'root'
})

export class RegisterService {
  url = "http://localhost:8080/app/";

  constructor(
    private http: HttpClient
  ) { }

  registerUser(user: User) {
    return this.http.post(this.url + "register", user)
      .subscribe();
  }

  getUsers() {
    return this.http.get(this.url + "getPersons");
  }
}
