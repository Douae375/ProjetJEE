import { CanActivateFn } from '@angular/router';
import { Router} from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  if (typeof window !== 'undefined' && localStorage) {
    const token = localStorage.getItem('authToken'); 

    if (token) {
      return true; 
    } else {
      router.navigate(['/login']);
      return false;
    }
  } else {
    router.navigate(['/login']);
    return false;
  }
};