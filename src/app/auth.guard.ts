import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { GlobalesService } from './Services/GlobalesServices';
import { Router } from '@angular/router';

export const AuthGuard: CanActivateFn = () => {
  const globalesService = inject(GlobalesService);
  const router = inject(Router);

  if (globalesService.Token()) {
    // Si el token existe, permite el acceso a la página
    return true;
  } else {
    // Si no hay token, redirige al login
    router.navigate(['/Login']);
    return false;
  }
};



