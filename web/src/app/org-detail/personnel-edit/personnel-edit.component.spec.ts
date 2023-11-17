import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonnelEditComponent } from './personnel-edit.component';

describe('PersonnelEditComponent', () => {
  let component: PersonnelEditComponent;
  let fixture: ComponentFixture<PersonnelEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PersonnelEditComponent]
    });
    fixture = TestBed.createComponent(PersonnelEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
