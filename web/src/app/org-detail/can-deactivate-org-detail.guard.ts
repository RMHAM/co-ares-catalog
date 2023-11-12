import { CanDeactivateFn } from '@angular/router';
import { of } from 'rxjs';

import { OrgDetailComponent } from './org-detail.component';

export const canDeactivateOrgDetailGuard: CanDeactivateFn<
  OrgDetailComponent
> = (component) => {
  if (component.editMode) {
    const result = window.confirm('There are unsaved changes! Are you sure?');
    return of(result);
  }
  return of(true);
};
