import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  keyAuthen = environment.keyLocalAuthenInfo;

  constructor() { }

  getToken(): String | null {
    return localStorage.getItem(this.keyAuthen) ?? null;  // ?? is a default value
  }

  setToken(token: string) {
    localStorage.setItem(this.keyAuthen, token);
  }

  clearToken() {
    localStorage.removeItem(this.keyAuthen);
  }

  getUserInfo(): String {
    return localStorage.getItem('name');
  }

}
