import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../types/user.type';
import { CartService } from './cart.service';
import { environment as env } from '../../environments/environment';
import { AddressService } from './address.service';
import { Router } from '@angular/router';
import { error } from '@angular/compiler/src/util';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  baseUrl = 'https://gameshopv2.herokuapp.com/users';
  private user: User;
  errors;

  constructor(
    private http: HttpClient,
    private cartService: CartService,
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
        console.log(response)
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
    const token = window.localStorage.getItem('token');
    const httpOptions = {
      headers: { Authorization: `Bearer ${token}` },
    };

    this.http
      .put(`${env.usersApiURL}/${this.user.id}`, editedForm, httpOptions)
      .subscribe(
        (response: User) => {
          this.user = response;
          this.getDetails();
        },
        (error) => {
          this.errors = error.error.message[0].messages[0].message;
        }
      );
  }

  getServerErrors() {
    return this.errors;
  }
}
