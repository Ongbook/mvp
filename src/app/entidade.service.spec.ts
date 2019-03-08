import { TestBed, inject } from '@angular/core/testing';

import { EntidadeService } from './entidade.service';

describe('EntidadeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EntidadeService]
    });
  });

  it('should be created', inject([EntidadeService], (service: EntidadeService) => {
    expect(service).toBeTruthy();
  }));
});
