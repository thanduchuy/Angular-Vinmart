import { TestBed } from '@angular/core/testing';

import { LoggedGurardService } from './logged-gurard.service';

describe('LoggedGurardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LoggedGurardService = TestBed.get(LoggedGurardService);
    expect(service).toBeTruthy();
  });
});
