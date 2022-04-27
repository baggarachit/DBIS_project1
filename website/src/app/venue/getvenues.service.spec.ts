import { TestBed } from '@angular/core/testing';

import { GetvenuesService } from './getvenues.service';

describe('GetvenuesService', () => {
  let service: GetvenuesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetvenuesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
