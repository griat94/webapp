import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Person } from 'src/app/interfaces/Person';

@Injectable({
  providedIn: 'root'
})

export class RegisterService {
  url = "http://localhost:8080/app/register";

  constructor(
    private http: HttpClient
  ) { }

  registerPerson(person: Person) {
    return this.http.post(this.url, person);
  }
}
