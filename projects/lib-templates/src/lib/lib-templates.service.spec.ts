import { TestBed } from '@angular/core/testing';

import { LibTemplatesService } from './lib-templates.service';

describe('LibTemplatesService', () => {
  let service: LibTemplatesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LibTemplatesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
