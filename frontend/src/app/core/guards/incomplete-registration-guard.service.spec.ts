import { TestBed, inject } from '@angular/core/testing';

import { IncompleteRegistrationGuardService } from './incomplete-registration-guard.service';

describe('IncompleteRegistrationGuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IncompleteRegistrationGuardService]
    });
  });

  it('should be created', inject([IncompleteRegistrationGuardService], (service: IncompleteRegistrationGuardService) => {
    expect(service).toBeTruthy();
  }));
});
