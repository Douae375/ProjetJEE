import { TestBed } from '@angular/core/testing';

import { DepartementService1 } from './departement1.service';

describe('DepartementService', () => {
  let service: DepartementService1;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DepartementService1);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
