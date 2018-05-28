import { TestBed, inject } from '@angular/core/testing';

import { JopApiDbService } from './jop-api-db.service';

describe('JopApiDbService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [JopApiDbService]
    });
  });

  it('should be created', inject([JopApiDbService], (service: JopApiDbService) => {
    expect(service).toBeTruthy();
  }));
});
