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

  getWorkouts(userId) {
    return this.http.get(this.baseUrl + "/getWorkouts" + "/" + userId);
  }

  deleteWorkout(workoutId) {
    return this.http.delete(this.baseUrl + "/deleteWorkout" + "/" + workoutId);
  }

  editWorkout(workoutId, workout: Workout) {
    return this.http.put(this.baseUrl + "/editWorkout" + "/" + workoutId, workout);
  }
}
