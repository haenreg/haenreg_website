import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { iUser } from '../interfaces/iUser';

@Injectable({
  providedIn: 'root'
})
export class UserStoreService {

  private userSource = new BehaviorSubject<iUser | null>(null); // User object

  user$ = this.userSource.asObservable(); // Observable for the user object

  setUser(user: iUser) {
    this.userSource.next(user);
  }

  clearUser() {
    this.userSource.next(null);
    localStorage.removeItem('authToken');
  }

}
