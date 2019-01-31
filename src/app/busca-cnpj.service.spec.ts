import { TestBed, inject } from '@angular/core/testing';

import { BuscaCnpjService } from './busca-cnpj.service';

describe('BuscaCnpjService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BuscaCnpjService]
    });
  });

  it(newFunction(), inject([BuscaCnpjService], (service: BuscaCnpjService) => {
    expect(service).toBeTruthy();
  }));

  it(newFunction(), inject([BuscaCnpjService], (service: BuscaCnpjService) => {
    expect(null).toBeFalsy();
  }));
  

  
});
function newFunction(): string {
  return 'should be created';
}

