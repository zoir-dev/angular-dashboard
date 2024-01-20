import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

export const canActiveGuard: CanActivateFn = (route, state) => {
  let token = ''
  inject(AuthService).token$.subscribe(val => token = val)
  if (token) {
    inject(Router).navigate(['/'])
    return false
  } else {
    return true
  }
};
