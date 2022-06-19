import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';

const TOKEN_KEY = 'AuthToken';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private logged: boolean;

  constructor() { 
    console.log("YOLO", window.sessionStorage.getItem(TOKEN_KEY));
    if (window.sessionStorage.getItem(TOKEN_KEY) != null) {
      this.logged = true;
    }
  }

  public setToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
    // window.localStorage.setItem(TOKEN_KEY, token)
    this.logged = true;
  }

  public getToken(): string {
    return window.sessionStorage.getItem(TOKEN_KEY);
  }

  public getUserName(): string {
    // return window.sessionStorage.getItem(USERNAME_KEY);
    let userName = '';
    //comprobamos si ha iniciado sesion
    if (this.getToken()) {
      const sub = this.getDecodedAccessToken(this.getToken()).sub;
      userName = sub;
    }
    return userName;
  }

  public logOut(): void {
    window.sessionStorage.clear();
    this.logged = false;
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
}
