import { TestBed } from '@angular/core/testing';

import { GetvenuedetailsService } from './getvenuedetails.service';

describe('GetvenuedetailsService', () => {
  let service: GetvenuedetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetvenuedetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
