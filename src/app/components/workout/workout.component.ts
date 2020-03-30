import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { WorkoutService } from 'src/app/services/WorkoutService/workout.service';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/LoginService/login.service';

import * as uuid from 'uuid';

declare var jQuery: any;

@Component({
  selector: 'app-workout',
  templateUrl: './workout.component.html',
  styleUrls: ['./workout.component.css', '../../app.component.css']
})
export class WorkoutComponent implements OnInit {
  workoutForm: FormGroup;
  submitted = false;
  completedWorkouts = [];
  userId: String;
  firstName: String;

  constructor(
    private formBuilder: FormBuilder,
    private workoutService: WorkoutService,
    private loginService: LoginService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.userId = this.loginService.getUserId();
    this.firstName = this.loginService.getUserName();

    console.log(this.userId, this.firstName);

    this.workoutForm = this.formBuilder.group({
      workoutType: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      exerciseName: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      weight: ['', [Validators.required, Validators.pattern('[0-9]*')]],
      sets: ['', Validators.required],
      repsPerSet: ['', Validators.required],
      id: [''],
      userId: this.userId
    });

    this.workoutService.getWorkouts(this.userId)
      .subscribe((workout) => {
        Object.assign(this.completedWorkouts, workout);
      })
  }

  get f() {
    return this.workoutForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.workoutForm.invalid) {
      return;
    } else {
      this.workoutForm.patchValue({ id: uuid.v4() })
      this.workoutService.addWorkout(this.workoutForm.value)
        .subscribe(() => {
          this.getWorkouts();
        });
      jQuery('#addWorkout').modal('hide');
      jQuery('#addWorkout')
        .find('input,select')
        .val('');
    }
  }

  getWorkouts() {
    this.workoutService.getWorkouts(this.userId)
      .subscribe((workout) => {
        this.completedWorkouts = [];
        console.log(workout);
        Object.assign(this.completedWorkouts, workout);
      })
  }

  doEdit(workoutId: string) {
    console.log("EDITING!!!");
    console.log(workoutId);
  }

  doDelete(workoutId: string) {
    console.log(workoutId);
    this.workoutService.deleteWorkout(workoutId)
      .subscribe(() => { this.getWorkouts() });
  }

  doLogout() {
    this.router.navigate(['/home']);
  }

  removeValidators(form: FormGroup) {
    for (const key in form.controls) {
      form.get(key).clearValidators();
      form.get(key).updateValueAndValidity();
    }
  }

}