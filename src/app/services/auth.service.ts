import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { tap, catchError, mapTo } from 'rxjs/operators';

import { config } from '../config';
import { Router } from '@angular/router';
import { User } from '../models/user.model';

interface AuthResponse {
  id: string;
  email: string;
  role: string;
  store?: number;
  token: string;
  refreshToken: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly USER_DATA = 'USER';

  user: BehaviorSubject<User> = new BehaviorSubject(null);

  constructor(private http: HttpClient, private router: Router) {}

  autoLogin() {
    const user = this.retrieveUser();
    if (!user) return;

    this.user.next(user);
  }

  login(user: { email: string; password: string }): Observable<any> {
    return this.http.post<AuthResponse>(`${config.apiUrl}/login`, user).pipe(
      catchError(this.handleLoginError),
      tap((response: AuthResponse) => this.doLoginUser(response)),
      mapTo(true)
    );
  }

  handleLoginError(error: HttpErrorResponse) {
    let errorMessage = 'Errore non conosciuto.';
    if (error && error.error) {
      switch (error.error) {
        case 'Invalid credentials!':
          errorMessage = 'Credenziali errate!';
          break;

        default:
          break;
      }
    }

    return throwError(errorMessage);
  }

  logout() {
    return this.http
      .post<any>(`${config.apiUrl}/logout`, {
        refreshToken: this.user.getValue().refreshToken,
      })
      .pipe(
        catchError((error) => {
          console.log(error);
          return throwError(error);
        }),
        tap(() => this.doLogoutUser()),
        mapTo(true)
      );
  }

  refreshToken() {
    return this.http
      .post<{ jwt: string }>(`${config.apiUrl}/refresh`, {
        refreshToken: this.user.getValue().refreshToken,
      })
      .pipe(
        catchError((error) => {
          if (error instanceof HttpErrorResponse && error.status === 401)
            this.doLogoutUser();

          return throwError(error);
        }),
        tap((token: { jwt: string }) => {
          this.storeJwtToken(token.jwt);
        })
      );
  }

  private doLoginUser(response: AuthResponse) {
    const user = new User(
      response.id,
      response.email,
      response.role,
      response.store,
      response.token,
      response.refreshToken
    );
    this.storeUser(user);
    this.user.next(user);
  }

  private doLogoutUser() {
    this.removeUser();
    this.user.next(null);
    this.router.navigate(['/login']);
  }

  private storeJwtToken(jwt: string) {
    let user = this.retrieveUser();
    if (!user) return;

    user.token = jwt;
    localStorage.setItem(this.USER_DATA, JSON.stringify(user));
  }

  private storeUser(user: User) {
    localStorage.setItem(this.USER_DATA, JSON.stringify(user));
  }

  private removeUser() {
    localStorage.removeItem(this.USER_DATA);
  }

  private retrieveUser(): User {
    try {
      const userData: {
        id: string;
        email: string;
        role: string;
        store: number;
        _token: string;
        _refreshToken: string;
      } = JSON.parse(localStorage.getItem(this.USER_DATA));

      if (!userData) return null;

      const user = new User(
        userData.id,
        userData.email,
        userData.role,
        userData.store,
        userData._token,
        userData._refreshToken
      );
      return user;
    } catch (ex) {
      this.doLogoutUser();
    }

    return null;
  }

  // private fakeLogin() {
  //   this.doLoginUser({
  //     id: 'a234hgbf132d1',
  //     email: 'email@email.it',
  //     role: 'admin',
  //     store: null,
  //     token: 'fad4341sfaf4f1d4safasf',
  //     refreshToken: 'sadf44aa1sdf1sfads14314',
  //   });
  // }

  // private fakeLogout() {
  //   this.doLogoutUser();
  // }
}
