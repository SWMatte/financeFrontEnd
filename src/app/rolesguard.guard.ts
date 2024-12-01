import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChildFn, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
 import { AuthenticatorService } from './service/authenticator.service';

 
 
export const canActivate: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const authService = inject(AuthenticatorService);
  const router = inject(Router);
  
  const token = localStorage.getItem('token')
  
  if (token) {
    return true; // Consenti l'accesso
  } else {
    // Reindirizza alla pagina di login o altra pagina fallback
    return router.createUrlTree(['/login']);
  }
};

export const canActivateChild: CanActivateChildFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => canActivate(route, state);