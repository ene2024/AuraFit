import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';


export const authGuard: CanActivateFn = (route, state) => {
  
  const authService=inject(AuthenticationService)
  const router = inject (Router);

  const carga=authService.activeUser
  if(carga){
    return true;
  }else{
    router.navigate(['/login']);
    return false;
  }
}