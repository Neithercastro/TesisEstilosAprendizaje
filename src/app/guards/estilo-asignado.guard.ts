import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { GlobalesService } from 'src/app/Services/GlobalesServices';
import { Router } from '@angular/router';

export const EstiloAsignadoGuard: CanActivateFn = () => {
  const globalesService = inject(GlobalesService);
  const router = inject(Router);

  // Verifica si el usuario tiene un estilo asignado
  if (globalesService.TieneEstiloAsignado()) {
    // Si ya tiene estilo asignado, redirige al home
    router.navigate(['/Home']);
    return false;
  }

  // Si no tiene estilo asignado, permite el acceso al cuestionario
  return true;
};
