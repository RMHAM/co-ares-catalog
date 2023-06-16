import { TestBed } from '@angular/core/testing';

import { Ics217Service } from './ics217.service';

describe('Ics217Service', () => {
  let service: Ics217Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Ics217Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
