import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  const token = localStorage.getItem('token');
  const user = localStorage.getItem('user');

  // nincs login
  if (!token || !user) {
    router.navigate(['/login']);
    return false;
  }

  const role = JSON.parse(user).role;

  // nem journalist
  if (role !== 'JOURNALIST') {
    router.navigate(['/']); // vagy error page később
    return false;
  }

  // ok
  return true;
};
