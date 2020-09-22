import { Component, OnInit } from '@angular/core';
import { AddressService } from 'src/app/services/address.service';
import { UserService } from 'src/app/services/user.service';
import { Address } from 'src/app/types/address.type';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditProfileModalComponent } from 'src/app/components/edit-profile-modal/edit-profile-modal.component';
import { EditAddressModalComponent } from 'src/app/components/edit-address-modal/edit-address-modal.component';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss'],
})
export class ProfilePageComponent implements OnInit {
  selectedAddress: Address;

  get user() {
    return this.userService.getUser();
  }
  get userAddresses() {
    return this.addressService.getUserAddress();
  }

  

  constructor(
    private userService: UserService,
    private addressService: AddressService,
    private config: NgbModalConfig,
    private modalService: NgbModal,
  ) {}

  ngOnInit(): void {
    setTimeout(() => this.addressService.fetchUserAddress(), 100);
  }

  selectForEditAddress(addressId: number) {
    const selected = this.userAddresses.find(
      (address) => address.id === addressId
    );
    this.selectedAddress = selected;
  }

  openModal() {
    const modalRef = this.modalService.open(EditProfileModalComponent , {centered:true});
    modalRef.componentInstance.user = {
      username:this.user.username,
      lastName:this.user.lastName,
      email:this.user.email,
      phone:this.user.phone
    }
    
} 

}
