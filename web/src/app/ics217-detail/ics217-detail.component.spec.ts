import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Ics217DetailComponent } from './ics217-detail.component';

describe('Ics217DetailComponent', () => {
  let component: Ics217DetailComponent;
  let fixture: ComponentFixture<Ics217DetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [Ics217DetailComponent],
    });
    fixture = TestBed.createComponent(Ics217DetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
