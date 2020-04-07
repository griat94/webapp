import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { WorkoutService } from 'src/app/services/WorkoutService/workout.service';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/LoginService/login.service';

import * as uuid from 'uuid';
import { Workout } from 'src/app/interfaces/Workout';

declare var jQuery: any;

@Component({
  selector: 'app-workout',
  templateUrl: './workout.component.html',
  styleUrls: ['./workout.component.css', '../../app.component.css']
})
export class WorkoutComponent implements OnInit {
  workoutForm: FormGroup;
  userId: String;
  firstName: String;

  submitted = false;
  editing = false;
  editWorkoutId = "";
  filterWorkoutKeyWord = "";
  completedWorkouts = [];
  filteredWorkouts = [];

  sortByWorkoutTypeFlag = "";
  sortByExerciseNameFlag = "";
  sortByWeightFlag = "";
  sortBySetsFlag = "";
  sortByRepsPerSetFlag = "";

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

  filterWorkouts() {
    this.filteredWorkouts = this.completedWorkouts.filter((workout) => {
      return workout.workoutType.toLowerCase().includes(this.filterWorkoutKeyWord.toLowerCase()) || workout.exerciseName.toLowerCase().includes(this.filterWorkoutKeyWord.toLowerCase());
    });

    if (this.filterWorkoutKeyWord === "" || this.filterWorkoutKeyWord.charAt[0] === " ") {
      this.getWorkouts();
    }

    if (this.filteredWorkouts.length === 0) {
      this.filteredWorkouts = this.completedWorkouts;
    }

    this.completedWorkouts = this.filteredWorkouts;
  }

  getWorkouts() {
    this.workoutService.getWorkouts(this.userId)
      .subscribe((workout) => {
        this.completedWorkouts = [];
        console.log(workout);
        Object.assign(this.completedWorkouts, workout);
      })
  }

  sortByWorkoutType() {
    let i: number;
    let temp = {};

    if (this.sortByWorkoutTypeFlag === "" || this.sortByWorkoutTypeFlag === "false") {
      this.sortByWorkoutTypeFlag = "true";
      console.log(this.completedWorkouts[0].workoutType);

      for (i = 0; i < this.completedWorkouts.length - 1; i++) {
        if (this.completedWorkouts[i].workoutType.localeCompare(this.completedWorkouts[i + 1].workoutType) == 1) {
          Object.assign(temp, this.completedWorkouts[i]);
          Object.assign(this.completedWorkouts[i], this.completedWorkouts[i + 1]);
          Object.assign(this.completedWorkouts[i + 1], temp);
        }
      }

    } else {
      this.sortByWorkoutTypeFlag = "false";

      for (i = 0; i < this.completedWorkouts.length - 1; i++) {
        if (this.completedWorkouts[i].workoutType.localeCompare(this.completedWorkouts[i + 1].workoutType) == -1) {
          Object.assign(temp, this.completedWorkouts[i]);
          Object.assign(this.completedWorkouts[i], this.completedWorkouts[i + 1]);
          Object.assign(this.completedWorkouts[i + 1], temp);
        }
      }

    }
  }

  sortByExerciseName() {
    let i: number;
    let temp = {};

    if (this.sortByExerciseNameFlag === "" || this.sortByExerciseNameFlag === "false") {
      this.sortByExerciseNameFlag = "true";

      for (i = 0; i < this.completedWorkouts.length - 1; i++) {
        if (this.completedWorkouts[i].exerciseName.localeCompare(this.completedWorkouts[i + 1].exerciseName) == 1) {
          Object.assign(temp, this.completedWorkouts[i]);
          Object.assign(this.completedWorkouts[i], this.completedWorkouts[i + 1]);
          Object.assign(this.completedWorkouts[i + 1], temp);
        }
      }

    } else {
      this.sortByExerciseNameFlag = "false";

      for (i = 0; i < this.completedWorkouts.length - 1; i++) {
        if (this.completedWorkouts[i].exerciseName.localeCompare(this.completedWorkouts[i + 1].exerciseName) == -1) {
          Object.assign(temp, this.completedWorkouts[i]);
          Object.assign(this.completedWorkouts[i], this.completedWorkouts[i + 1]);
          Object.assign(this.completedWorkouts[i + 1], temp);
        }
      }

    }
  }

  sortByWeight() {
    let i: number;
    let temp = {};

    if (this.sortByWeightFlag === "" || this.sortByWeightFlag === "false") {
      this.sortByWeightFlag = "true";

      for (i = 0; i < this.completedWorkouts.length - 1; i++) {
        if (this.completedWorkouts[i].weight > this.completedWorkouts[i + 1].weight) {
          Object.assign(temp, this.completedWorkouts[i]);
          Object.assign(this.completedWorkouts[i], this.completedWorkouts[i + 1]);
          Object.assign(this.completedWorkouts[i + 1], temp);
        }
      }

    } else {
      this.sortByWeightFlag = "false";

      for (i = 0; i < this.completedWorkouts.length - 1; i++) {
        if (this.completedWorkouts[i].weight < this.completedWorkouts[i + 1].weight) {
          Object.assign(temp, this.completedWorkouts[i]);
          Object.assign(this.completedWorkouts[i], this.completedWorkouts[i + 1]);
          Object.assign(this.completedWorkouts[i + 1], temp);
        }
      }

    }
  }

  sortBySets() {
    let i: number;
    let temp = {};

    if (this.sortBySetsFlag === "" || this.sortBySetsFlag === "false") {
      this.sortBySetsFlag = "true";

      for (i = 0; i < this.completedWorkouts.length - 1; i++) {
        if (this.completedWorkouts[i].sets > this.completedWorkouts[i + 1].sets) {
          Object.assign(temp, this.completedWorkouts[i]);
          Object.assign(this.completedWorkouts[i], this.completedWorkouts[i + 1]);
          Object.assign(this.completedWorkouts[i + 1], temp);
        }
      }

    } else {
      this.sortBySetsFlag = "false";

      for (i = 0; i < this.completedWorkouts.length - 1; i++) {
        if (this.completedWorkouts[i].sets < this.completedWorkouts[i + 1].sets) {
          Object.assign(temp, this.completedWorkouts[i]);
          Object.assign(this.completedWorkouts[i], this.completedWorkouts[i + 1]);
          Object.assign(this.completedWorkouts[i + 1], temp);
        }
      }

    }
  }

  sortByRepsPerSet() {
    let i: number;
    let temp = {};

    if (this.sortByRepsPerSetFlag === "" || this.sortByRepsPerSetFlag === "false") {
      this.sortByRepsPerSetFlag = "true";

      for (i = 0; i < this.completedWorkouts.length - 1; i++) {
        if (this.completedWorkouts[i].repsPerSet > this.completedWorkouts[i + 1].repsPerSet) {
          Object.assign(temp, this.completedWorkouts[i]);
          Object.assign(this.completedWorkouts[i], this.completedWorkouts[i + 1]);
          Object.assign(this.completedWorkouts[i + 1], temp);
        }
      }

    } else {
      this.sortByRepsPerSetFlag = "false";

      for (i = 0; i < this.completedWorkouts.length - 1; i++) {
        if (this.completedWorkouts[i].repsPerSet < this.completedWorkouts[i + 1].repsPerSet) {
          Object.assign(temp, this.completedWorkouts[i]);
          Object.assign(this.completedWorkouts[i], this.completedWorkouts[i + 1]);
          Object.assign(this.completedWorkouts[i + 1], temp);
        }
      }

    }
  }

  doEdit(workout: Workout) {
    this.editing = true;
    this.editWorkoutId = workout.id;
  }

  doDelete(workoutId: string) {
    this.workoutService.deleteWorkout(workoutId)
      .subscribe(() => { this.getWorkouts() });
  }

  doSave(workout: Workout) {
    console.log(workout.id);
    this.editing = false;
    this.editWorkoutId = "";

    this.workoutService.editWorkout(workout.id, workout)
      .subscribe();
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
