import { TestBed } from '@angular/core/testing';

import { HealthSafetyAPIService } from './health-safety-api.service';

describe('HealthSafetyAPIService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HealthSafetyAPIService = TestBed.get(HealthSafetyAPIService);
    expect(service).toBeTruthy();
  });
});
