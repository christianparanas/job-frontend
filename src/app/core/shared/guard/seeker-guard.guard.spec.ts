import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { seekerGuardGuard } from './seeker-guard.guard';

describe('seekerGuardGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => seekerGuardGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
