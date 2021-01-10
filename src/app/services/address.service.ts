import { HttpClient } from '@angular/common/http';
import { environment as env } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { Address } from '../types/address.type';

@Injectable({
  providedIn: 'root',
})
export class AddressService {
  userAddresses: Address[] = [];

  constructor(private http: HttpClient, private userService: UserService) {}

  fetchUserAddress() {
    const userId = JSON.parse(localStorage.getItem('user')).id;

    this.http
      .get(`${env.addressApiURL}/?user=${userId}`)
      .subscribe((response: Address[]) => (this.userAddresses = response));
  }

  getUserAddress() {
    return this.userAddresses;
  }

  addUserAddress(address: Address) {
    const NewAddress = {
      user: this.userService.getUser(),
      ...address,
    };

    return this.http
      .post(`${env.addressApiURL}`, NewAddress)
      .subscribe((response) => {
        this.fetchUserAddress();
      });
  }

  editUserAddress(address: Address, addressId: number) {
    return this.http
      .put(`${env.addressApiURL}/${addressId}`, address)
      .subscribe((response) => {
        this.fetchUserAddress();
      });
  }

  deleteAddress(addressId: number) {
    return this.http
      .delete(`${env.addressApiURL}/${addressId}`)
      .subscribe((response) => {
        this.fetchUserAddress();
      });
  }

}
