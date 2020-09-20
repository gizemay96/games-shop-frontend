import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../types/user.type';
import { CartService } from './cart.service';
import { environment as env } from '../environments/environment';
import { AddressService } from './address.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  baseUrl = 'http://localhost:1337/users';
  private user: User;

  constructor(
    private http: HttpClient,
    private cartService: CartService,
    private addressService:AddressService
    ) {}

  setUser(user: User = null) {
    this.user = user;
  }

  getUser() {
    return this.user;
  }

  tryToLogin() {
    console.log("trying")
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
        this.getDetails();
        this.cartService.fetchUserCart(this.user.id)
        this.addressService.fetchUserAddress(this.user.id)
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
          this.user.avatarUrl= 'assets/avatar-placeholder.jpg';
        }
      });
  }

}

  

