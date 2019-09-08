import { TestBed } from '@angular/core/testing';

import { GuardServiceService } from './guard-service.service';

describe('GuardServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GuardServiceService = TestBed.get(GuardServiceService);
    expect(service).toBeTruthy();
  });
});
