import { Component, OnInit } from '@angular/core';
import { AddressService } from 'src/app/services/address.service';
import { UserService } from 'src/app/services/user.service';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditProfileModalComponent } from 'src/app/components/./Modals/edit-profile-modal/edit-profile-modal.component';
import { EditAddressModalComponent } from 'src/app/components/Modals/edit-add-address-modal/edit-add-address-modal.component';
import { Address } from 'src/app/types/address.type';

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

  selectedAddress: Address;

  constructor(
    private userService: UserService,
    private addressService: AddressService,
    private config: NgbModalConfig,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    setTimeout(() => this.addressService.fetchUserAddress(), 100);
  }

  openEditProfileModal() {
    const modalRef = this.modalService.open(EditProfileModalComponent, {
      centered: true,
    });
    modalRef.componentInstance.editForm.patchValue({
      username: this.user.username,
      lastName: this.user.lastName,
      email: this.user.email,
      phone: this.user.phone,
    });
  }

  openEditAddressModal(addressId) {
    this.selectedAddress = this.userAddresses.find(
      (address) => address.id === addressId
    );
    const modalRef = this.modalService.open(EditAddressModalComponent, {
      centered: true,
    });
    modalRef.componentInstance.addressForm.patchValue({
      addressName: this.selectedAddress.addressName,
      suite: this.selectedAddress.suite,
      streetName: this.selectedAddress.streetName,
      city: this.selectedAddress.city,
      country: this.selectedAddress.country,
      id: this.selectedAddress.id,
    });
  }

  openAddAddressModal() {
    this.modalService.open(EditAddressModalComponent, { centered: true });
  }

  deleteAddress(addressId: number) {
    this.addressService.deleteAddress(addressId);
  }
}
