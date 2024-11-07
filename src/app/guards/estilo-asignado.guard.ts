import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { GlobalesService } from 'src/app/Services/GlobalesServices';
import { Router } from '@angular/router';

export const EstiloAsignadoGuard: CanActivateFn = () => {
  const globalesService = inject(GlobalesService);
  const router = inject(Router);

  // Verifica si el usuario tiene un estilo asignado
  // Verifica si el estilo es diferente a "SinConfirmar"
if (globalesService.ObtenerEstilo() !== "SinConfirmar") {
  // Si tiene un estilo asignado, redirige al home
  router.navigate(['/Home']);
  return false;
} else {
  
  return true;
}
//return true
};
