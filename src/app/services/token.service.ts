import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';

const TOKEN_KEY = 'AuthToken';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private logged: boolean;
  private loggedObs: BehaviorSubject<boolean>;
  constructor() {
    this.loggedObs = new BehaviorSubject<boolean>(false);
    if (window.localStorage.getItem(TOKEN_KEY) != null) {
      this.logged = true;
      this.loggedObs.next(true);
    }
  }

  public setToken(token: string): void {
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.setItem(TOKEN_KEY, token);
    // window.localStorage.setItem(TOKEN_KEY, token)
    this.logged = true;
    this.loggedObs.next(true);
  }

  public getToken(): string {
    return window.localStorage.getItem(TOKEN_KEY);
  }

  public getUserName(): string {
    // return window.localStorage.getItem(USERNAME_KEY);
    let userName = '';
    //comprobamos si ha iniciado sesion
    if (this.getToken()) {
      const sub = this.getDecodedAccessToken(this.getToken()).sub;
      userName = sub;
    }
    return userName;
  }

  public logOut(): void {
    window.localStorage.clear();
    this.logged = false;
    this.loggedObs.next(false);
  }

  public isLogged(): boolean {
    return this.logged;
  }

  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch(Error) {
      return null;
    }
  }

  getLoggedObs(): Observable<boolean> {
    return this.loggedObs.asObservable();
  }
}
