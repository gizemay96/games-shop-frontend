import { Component, OnInit } from '@angular/core';
import { AddressService } from 'src/app/services/address.service';
import { UserService } from 'src/app/services/user.service';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditProfileModalComponent } from 'src/app/components/./Modals/edit-profile-modal/edit-profile-modal.component';
import { EditAddressModalComponent } from 'src/app/components/Modals/edit-address-modal/edit-address-modal.component';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss'],
})
export class ProfilePageComponent implements OnInit {

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

  openEditProfileModal() {
    const modalRef = this.modalService.open(EditProfileModalComponent , {centered:true});
    modalRef.componentInstance.user = this.user;
} 


openEditAddressModal(addressId){
  const selected = this.userAddresses.find(
    (address) => address.id === addressId
  );
  const modalRef = this.modalService.open(EditAddressModalComponent , {centered:true});
  modalRef.componentInstance.address = selected; 
}

openAddAddressModal(){
this.modalService.open(EditAddressModalComponent , {centered:true});
  
}

deleteAddress(addressId:number){
  this.addressService.deleteAddress(addressId)
}



}
