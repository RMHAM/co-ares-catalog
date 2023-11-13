import { TestBed } from '@angular/core/testing';
import { CanDeactivateFn } from '@angular/router';

import { canDeactivateOrgDetailGuard } from './can-deactivate-org-detail.guard';
import { OrgDetailComponent } from './org-detail.component';

describe('canDeactivateOrgDetailGuard', () => {
  const executeGuard: CanDeactivateFn<OrgDetailComponent> = (
    ...guardParameters
  ) =>
    TestBed.runInInjectionContext(() =>
      canDeactivateOrgDetailGuard(...guardParameters),
    );

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
