import { TestBed, inject } from '@angular/core/testing';

import { JopsApiLoginService } from './jops-api-login.service';

describe('JopsApiLoginService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [JopsApiLoginService]
    });
  });

  it('should be created', inject([JopsApiLoginService], (service: JopsApiLoginService) => {
    expect(service).toBeTruthy();
  }));
});
