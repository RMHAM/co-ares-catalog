import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgBranchComponent } from './org-branch.component';

describe('OrgBranchComponent', () => {
  let component: OrgBranchComponent;
  let fixture: ComponentFixture<OrgBranchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrgBranchComponent],
    });
    fixture = TestBed.createComponent(OrgBranchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
