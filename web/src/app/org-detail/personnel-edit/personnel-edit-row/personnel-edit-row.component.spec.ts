import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonnelEditRowComponent } from './personnel-edit-row.component';

describe('PersonnelEditRowComponent', () => {
  let component: PersonnelEditRowComponent;
  let fixture: ComponentFixture<PersonnelEditRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonnelEditRowComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PersonnelEditRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
