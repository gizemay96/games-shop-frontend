import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl = 'http://localhost:1337/auth';

  constructor(private http: HttpClient, private userService: UserService, private router : Router) {}

  register(registerData) {
    return this.http.post(`${this.baseUrl}/local/register`, registerData);
  }

  logout() {
    window.localStorage.removeItem('token');
    this.userService.setUser();
    this.router.navigateByUrl('/');
  }

  setToken(token: string) {
    window.localStorage.setItem('token', token);
  }

  login(loginForm) {
    return this.http.post(`${this.baseUrl}/local`, loginForm);
  }

  isAuthenticated():boolean {
    return !!window.localStorage.getItem('token')
  }
}
