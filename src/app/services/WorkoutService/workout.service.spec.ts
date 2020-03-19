import { TestBed } from '@angular/core/testing';

import { WorkoutService } from './workout.service';

describe('WorkoutServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WorkoutService = TestBed.get(WorkoutService);
    expect(service).toBeTruthy();
  });
});
