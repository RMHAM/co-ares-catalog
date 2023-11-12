import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { canDeactivateOrgDetailGuard } from './can-deactivate-org-detail.guard';

describe('canDeactivateOrgDetailGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => canDeactivateOrgDetailGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
