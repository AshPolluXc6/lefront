import { TestBed } from '@angular/core/testing';

import { ClibService } from './clib.service';

describe('ClibService', () => {
  let service: ClibService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClibService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
