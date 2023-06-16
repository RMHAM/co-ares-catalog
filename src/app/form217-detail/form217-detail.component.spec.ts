import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Form217DetailComponent } from './form217-detail.component';

describe('Form217DetailComponent', () => {
  let component: Form217DetailComponent;
  let fixture: ComponentFixture<Form217DetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Form217DetailComponent],
    });
    fixture = TestBed.createComponent(Form217DetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
