import { TestBed, inject } from '@angular/core/testing';

import { BuscaCnpjService } from './busca-cnpj.service';

describe('BuscaCnpjService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BuscaCnpjService]
    });
  });

  it('should be created', inject([BuscaCnpjService], (service: BuscaCnpjService) => {
    expect(service).toBeTruthy();
  }));
});
