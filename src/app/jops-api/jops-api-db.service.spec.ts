import { TestBed, inject } from '@angular/core/testing';

import { JopsApiDbService } from './jops-api-db.service';

describe('JopsApiDbService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [JopsApiDbService]
    });
  });

  it('should be created', inject([JopsApiDbService], (service: JopsApiDbService) => {
    expect(service).toBeTruthy();
  }));
});
