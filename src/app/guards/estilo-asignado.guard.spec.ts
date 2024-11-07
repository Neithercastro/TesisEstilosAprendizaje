import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { EstiloAsignadoGuard } from './estilo-asignado.guard';

describe('estiloAsignadoGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => EstiloAsignadoGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
