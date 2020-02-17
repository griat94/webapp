import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Person } from '../../interfaces/Person';
import { RegisterService } from 'src/app/services/RegisterService/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css', '../../app.component.css']
})
export class RegisterComponent implements OnInit {

  person: Person = {
    firstName: '',
    lastName: '',
    email: '',
    phone: null,
    id: null
  }

  constructor(
    private router: Router,
    private registerService: RegisterService
  ) { }

  ngOnInit() {
  }

  goBackToHome() {
    this.router.navigate(['/home']);
  }

  registerPerson() {
    console.log(this.person);
    this.registerService.registerPerson(this.person);
  }

}
