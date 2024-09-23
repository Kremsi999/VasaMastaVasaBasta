import { TestBed } from '@angular/core/testing';

import { OwnerFirmsService } from './owner-firms.service';

describe('OwnerFirmsService', () => {
  let service: OwnerFirmsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OwnerFirmsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
