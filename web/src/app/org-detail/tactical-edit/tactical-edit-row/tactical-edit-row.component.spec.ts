import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TacticalEditRowComponent } from './tactical-edit-row.component';

describe('TacticalEditRowComponent', () => {
  let component: TacticalEditRowComponent;
  let fixture: ComponentFixture<TacticalEditRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TacticalEditRowComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TacticalEditRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
