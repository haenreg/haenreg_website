import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap, take } from 'rxjs/operators';
import { HttpService } from './services/http.service';
import { UserStoreService } from './stores/user-store.service';

export const authGuard: CanActivateFn = (route, state): Observable<boolean> => {
  const userStore = inject(UserStoreService);
  const router = inject(Router);
  const httpService = inject(HttpService);

  let isCheckingUser = false;

  return userStore.user$.pipe(
    take(1),
    switchMap((user) => {
      if (user) {
        return of(true);
      } else if (!isCheckingUser) {
        isCheckingUser = true;

        return httpService.getData('users/fetch-user').pipe(
          map((response: { username: string; organization: string }) => {
            userStore.setUser({
              username: response.username,
              organization: response.organization
            });
            return true; // Allow access
          }),
          catchError(() => {
            userStore.clearUser();
            localStorage.removeItem('authToken');
            router.navigate(['/login']);
            return of(false);
          })
        );
      } else {
        return of(false);
      }
    })
  );
};
