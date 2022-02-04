import { TestBed } from '@angular/core/testing';

import { SharePointService } from './share-point.service';

describe('SharePointService', () => {
  let service: SharePointService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SharePointService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
