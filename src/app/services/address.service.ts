import { HttpClient } from '@angular/common/http';
import {environment as env} from '../environments/environment'
import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { Address } from '../types/address.type';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  userAddresses:Address[] = [];

  constructor(
    private http:HttpClient,
  ) { }

  fetchUserAddress(userId){
    console.log(userId)
    this.http.get(`${env.addressApiURL}/?user=${userId}`)
    .subscribe((response:Address[]) => 
    this.userAddresses = response
    )
  }


   getUserAddress(){
     return this.userAddresses
   }


}
