import { TestBed, inject } from '@angular/core/testing';

import { JwtHttpService } from './jwt-http.service';

describe('JwtHttpService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [JwtHttpService]
    });
  });

  it('should be created', inject([JwtHttpService], (service: JwtHttpService) => {
    expect(service).toBeTruthy();
  }));
});
