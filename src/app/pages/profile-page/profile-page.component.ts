import { Component, OnInit } from '@angular/core';
import { AddressService } from 'src/app/services/address.service';
import { UserService } from 'src/app/services/user.service';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditProfileModalComponent } from 'src/app/components/./Modals/edit-profile-modal/edit-profile-modal.component';
import { EditAddressModalComponent } from 'src/app/components/Modals/edit-add-address-modal/edit-add-address-modal.component';
import { Address } from 'src/app/types/address.type';
import { ConfirmationModalComponent } from 'src/app/components/Modals/confirmation-modal/confirmation-modal.component';
import { MatDialog } from '@angular/material/dialog';

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
  active = 1;

  constructor(
    private userService: UserService,
    private addressService: AddressService,
    private modalService: NgbModal,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    setTimeout(() => this.addressService.fetchUserAddress(), 100);
  }

  openEditProfileModal() {
    const data = { data: this.user, panelClass: "addressModal", }
    const dialogRef = this.dialog.open(EditProfileModalComponent, data)
    // const modalRef = this.modalService.open(EditProfileModalComponent, {
    //   centered: true,
    // });
    // modalRef.componentInstance.editForm.patchValue({
    //   username: this.user.username,
    //   name: this.user.name,
    //   lastName: this.user.lastName,
    //   email: this.user.email,
    //   phone: this.user.phone,
    // });
  }

  openEditAddressModal(addressId) {
    this.selectedAddress = this.userAddresses.find(
      (address) => address.id === addressId
    );

    const data = { data: this.selectedAddress, panelClass: "addressModal", }
    const dialogRef = this.dialog.open(EditAddressModalComponent, data)
  }

  openAddAddressModal() {
    const data = { data: {}, panelClass: "addressModal", }
    const dialogRef = this.dialog.open(EditAddressModalComponent, data)
  }

  deleteAddress(address) {
    const modalRef = this.modalService.open(ConfirmationModalComponent, {
      centered: true,
      windowClass: 'confirmation-modal'
    });
    modalRef.componentInstance.title =
      `Are you sure you want to delete " ${address.addressName} " ?`;
    modalRef.result.then((response) => {
      if (response === true) {
        this.addressService.deleteAddress(address.id);
      } else {
        return;
      }
    });
  }
}
