import { TestBed } from '@angular/core/testing';

import { EmployerAuthService } from './employer-auth.service';

describe('EmployerAuthService', () => {
  let service: EmployerAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmployerAuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
