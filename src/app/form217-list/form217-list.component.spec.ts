import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Form217ListComponent } from './form217-list.component';

describe('Form217ListComponent', () => {
  let component: Form217ListComponent;
  let fixture: ComponentFixture<Form217ListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Form217ListComponent],
    });
    fixture = TestBed.createComponent(Form217ListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
