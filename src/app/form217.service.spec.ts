import { TestBed } from '@angular/core/testing';

import { Form217Service } from './form217.service';

describe('Form217Service', () => {
  let service: Form217Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Form217Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
