import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../types/user.type';
import { CartService } from './cart.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  baseUrl = 'http://localhost:1337/users';
  private user: User;

  constructor(
    private http: HttpClient,
    private cartService: CartService
    ) {}

  setUser(user: User = null) {
    this.user = user;
  }

  getUser() {
    return this.user;
  }

  tryToLogin() {
    const token = window.localStorage.getItem('token');
    if (!token) return;

    this.http
      .get(`${this.baseUrl}/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .subscribe((response: User) => {
        this.user = response;
        this.cartService.fetchUserCart(this.user.id)
      });
  }
}
