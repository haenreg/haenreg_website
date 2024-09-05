import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap, take } from 'rxjs/operators';
import { HttpService } from './services/http.service';
import { UserStoreService } from './stores/user-store.service';

export const authGuard: CanActivateFn = (route, state): Observable<boolean> => {
  const userStore = inject(UserStoreService); // Inject UserStoreService
  const router = inject(Router); // Inject Router for navigation
  const httpService = inject(HttpService); // Inject HttpService

  let isCheckingUser = false; // Flag to ensure the check happens once

  return userStore.user$.pipe(
    take(1), // Only take the first value emitted by user$
    switchMap((user) => {
      if (user) {
        // If user is already present in the store, allow access
        return of(true);
      } else if (!isCheckingUser) {
        // If user is not present and this is the first check, make the API call
        isCheckingUser = true;

        return httpService.getData('users/fetch-user').pipe(
          map((response: { username: string; organization: string }) => {
            // Set the user in the store if API call is successful
            userStore.setUser({
              username: response.username,
              organization: response.organization
            });
            return true; // Allow access
          }),
          catchError(() => {
            // If the API call fails, clear the user, remove token, and redirect to login
            userStore.clearUser();
            localStorage.removeItem('authToken'); // Clear token if request fails
            router.navigate(['/login']); // Redirect to login
            return of(false); // Deny access
          })
        );
      } else {
        // If the check has already been made and failed, deny access
        return of(false);
      }
    })
  );
};
