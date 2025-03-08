import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service'; // Adjust path

export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Check if user is authenticated
  if (!authService.isAuthenticated()) {
    router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }

  // Get the user's role
  const userRole = authService.getUserRole();

  // Check if the role is 'User' (for candidates/seekers)
  if (userRole === 'Admin') {
    return true; // Allow access
  }

  // Redirect to an unauthorized page or home if role doesn't match
  router.navigate(['/unauthorized']);
  return false;
};
