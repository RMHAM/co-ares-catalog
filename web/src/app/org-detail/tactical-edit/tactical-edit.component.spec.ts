import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TacticalEditComponent } from './tactical-edit.component';

describe('TacticalEditComponent', () => {
  let component: TacticalEditComponent;
  let fixture: ComponentFixture<TacticalEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TacticalEditComponent]
    });
    fixture = TestBed.createComponent(TacticalEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
