import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from 'src/app/services/LoginService/login.service';
import { User } from 'src/app/interfaces/User';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css', '../../app.component.css']
})

export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private loginService: LoginService
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  goBackToHome() {
    this.router.navigate(['/home']);
  }

  onSubmit() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    } else {
      this.loginService.tryLogin(this.loginForm.value)
        .subscribe((val) => {
          if (val[0] !== "false") {
            this.loginService.saveUserInfo(val[0], val[1]);
            this.router.navigate(['/myWorkout']);
          } else {
            alert("Incorrect username or password! Please try again!")
          }
        });
    }
  }
}
