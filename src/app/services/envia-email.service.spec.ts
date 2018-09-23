import { TestBed, inject } from '@angular/core/testing';

import { EnviaEmailService } from './envia-email.service';

describe('EnviaEmailService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EnviaEmailService]
    });
  });

  it('should be created', inject([EnviaEmailService], (service: EnviaEmailService) => {
    expect(service).toBeTruthy();
  }));
});
