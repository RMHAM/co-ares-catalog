import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Ics217PrintComponent } from './ics217-print.component';

describe('Ics217PrintComponent', () => {
  let component: Ics217PrintComponent;
  let fixture: ComponentFixture<Ics217PrintComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Ics217PrintComponent],
    });
    fixture = TestBed.createComponent(Ics217PrintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
