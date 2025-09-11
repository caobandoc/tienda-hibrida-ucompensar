import { Injectable } from '@angular/core';
import {Token} from "../models/Token";

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private readonly TOKEN_KEY = 'jwt_token';
  private readonly EXPIRES_KEY = 'jwt_expires';

  setToken(obj: Token): void {
    localStorage.setItem(this.TOKEN_KEY, obj.token);
    localStorage.setItem(this.EXPIRES_KEY, obj.expiresAt);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  getExpiration(): string | null {
    return localStorage.getItem(this.EXPIRES_KEY);
  }

  removeToken(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.EXPIRES_KEY);
  }

  validateToken(): boolean {
    const token = this.getToken();
    const expiresAt = this.getExpiration();

    if (!token || !expiresAt) {
      return false;
    }

    const now = new Date();
    const expirationDate = new Date(expiresAt);

    if(expirationDate > now) {
      return true;
    }else{
      this.removeToken();
      return false;
    }

  }
}
