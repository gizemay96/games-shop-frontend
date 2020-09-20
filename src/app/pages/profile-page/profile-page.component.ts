import { Component, OnInit } from '@angular/core';
import { AddressService } from 'src/app/services/address.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {

  get user(){
    return this.userService.getUser()
  }
  get userAddresses(){
    return this.addressService.getUserAddress()
  }

  constructor(
    private userService:UserService,
    private addressService:AddressService,
  ) { }

  ngOnInit(): void {
  }

}
