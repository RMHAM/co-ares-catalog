import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TacticalViewComponent } from './tactical-view.component';

describe('TacticalViewComponent', () => {
  let component: TacticalViewComponent;
  let fixture: ComponentFixture<TacticalViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TacticalViewComponent]
    });
    fixture = TestBed.createComponent(TacticalViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
