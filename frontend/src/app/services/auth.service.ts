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

  setToken(token: string, id: number) {
    localStorage.setItem(this.keyAuthen, token);
    localStorage.setItem('id', `${id}`);
  }

  clearToken() {
    localStorage.removeItem(this.keyAuthen);
    localStorage.removeItem('id');
  }
}
