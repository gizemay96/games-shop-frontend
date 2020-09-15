import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl = 'http://localhost:1337/auth';

  constructor(private http: HttpClient, private userService: UserService) {}

  register (registerData) {
    return this.http.post(`${this.baseUrl}/local/register`, registerData)
   }

  logout() {
    window.localStorage.removeItem('token');
    this.userService.setUser();
  }

  setToken(token: string) {
    window.localStorage.setItem('token', token);
  }

  login(loginForm) {
    return this.http.post(`${this.baseUrl}/local`, loginForm);
  }
}
