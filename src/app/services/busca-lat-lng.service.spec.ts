import { TestBed, inject } from '@angular/core/testing';

import { BuscaLatLngService } from './busca-lat-lng.service';

describe('BuscaLatLngService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BuscaLatLngService]
    });
  });

  it('should be created', inject([BuscaLatLngService], (service: BuscaLatLngService) => {
    expect(service).toBeTruthy();
  }));
});
