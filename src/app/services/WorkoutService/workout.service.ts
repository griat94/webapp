import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Workout } from 'src/app/interfaces/Workout';

@Injectable({
  providedIn: 'root'
})
export class WorkoutService {
  baseUrl = "http://localhost:8080/app";

  constructor(
    private http: HttpClient
  ) { }

  addWorkout(workout: Workout) {
    return this.http.post(this.baseUrl + "/addWorkout", workout);
  }

  getWorkouts() {
    return this.http.get(this.baseUrl + "/getWorkouts");
  }

  deleteWorkout(workoutId) {
    return this.http.delete(this.baseUrl + "/deleteWorkout/" + workoutId);
  }
}
