import { TestBed, inject } from '@angular/core/testing';

import { JopsApiService } from './jops-api.service';

describe('JopsApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [JopsApiService]
    });
  });

  it('should be created', inject([JopsApiService], (service: JopsApiService) => {
    expect(service).toBeTruthy();
  }));
});
