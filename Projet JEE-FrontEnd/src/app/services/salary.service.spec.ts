import { TestBed } from '@angular/core/testing';

import { SalaireService } from './salary.service';

describe('SalaryService', () => {
  let service: SalaireService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SalaireService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
