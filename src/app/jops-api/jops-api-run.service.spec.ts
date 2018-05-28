import { TestBed, inject } from '@angular/core/testing';

import { JopsApiRunService } from './jops-api-run.service';

describe('JopsApiRunService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [JopsApiRunService]
    });
  });

  it('should be created', inject([JopsApiRunService], (service: JopsApiRunService) => {
    expect(service).toBeTruthy();
  }));
});
