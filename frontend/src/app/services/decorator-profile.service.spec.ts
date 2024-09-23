import { TestBed } from '@angular/core/testing';

import { DecoratorProfileService } from './decorator-profile.service';

describe('DecoratorProfileService', () => {
  let service: DecoratorProfileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DecoratorProfileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
