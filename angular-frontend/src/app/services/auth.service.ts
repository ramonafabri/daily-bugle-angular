import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

type StoredUser = {
  token: string;
  role: string;
  [key: string]: any;
} | null;

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private readonly TOKEN_KEY = 'token';
  private readonly USER_KEY = 'user';

  private currentUserSubject = new BehaviorSubject<StoredUser>(this.getUserFromStorage());
  currentUser$ = this.currentUserSubject.asObservable();

  constructor() {}

  setSession(data: { token: string; role: string; [key: string]: any }): void {
    localStorage.setItem(this.TOKEN_KEY, data.token);
    localStorage.setItem(this.USER_KEY, JSON.stringify(data));
    this.currentUserSubject.next(data);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  getUser(): StoredUser {
    return this.currentUserSubject.value;
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
    this.currentUserSubject.next(null);
  }

  isLoggedIn(): boolean {
    return !!this.currentUserSubject.value?.token;
  }

  isJournalist(): boolean {
    return this.currentUserSubject.value?.role === 'JOURNALIST';
  }

  private getUserFromStorage(): StoredUser {
    const user = localStorage.getItem(this.USER_KEY);

    if (!user) {
      return null;
    }

    try {
      return JSON.parse(user);
    } catch (error) {
      console.error('Hibás user adat a localStorage-ben:', error);
      return null;
    }
  }

}
