import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../types/user.type';
import { CartService } from './cart.service';
import { environment as env } from '../../environments/environment';
import { AddressService } from './address.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  baseUrl = 'http://localhost:1337/users';
  private user: User;

  constructor(
    private http: HttpClient,
    private cartService: CartService,
    private router: Router
  ) {}

  setUser(user: User = null) {
    this.user = user;
  }

  getUser() {
    return this.user;
  }

  tryToLogin() {
    console.log('trying');
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
        this.cartService.fetchUserCart(this.user.id);
        this.getDetails();
      });
  }

  getDetails() {
    const token = window.localStorage.getItem('token');
    const httpOptions = {
      headers: { Authorization: `Bearer ${token}` },
    };
    this.http
      .get(`${env.usersApiURL}/${this.user.id}`, httpOptions)
      .subscribe((response: any) => {
        if (response.avatar) {
          this.user.avatarUrl = `${env.baseApiURL}${response.avatar.url}`;
        } else {
          this.user.avatarUrl = 'assets/avatar-placeholder.jpg';
        }
      });
  }

  editUser(editedForm) {
    console.log(editedForm);
    const token = window.localStorage.getItem('token');
    const httpOptions = {
      headers: { Authorization: `Bearer ${token}` },
    };

    this.http
      .put(`${env.usersApiURL}/${this.user.id}`, editedForm, httpOptions)
      .subscribe((response: User) => {
        this.user = response;
        this.getDetails()
      });
  }
}
