import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AddressService } from 'src/app/services/address.service';
import { Address } from 'src/app/types/address.type';

@Component({
  selector: 'app-edit-address-modal',
  templateUrl: './edit-address-modal.component.html',
  styleUrls: ['./edit-address-modal.component.scss'],
})
export class EditAddressModalComponent implements OnInit {
  @Input() address: Address = {
    addressName : "",
    suite:"",
    streetName:"",
    city:"",
    country:""
  }


  constructor(public activeModal: NgbActiveModal , private addressService:AddressService) {}

  ngOnInit(): void {
  }

  editData() {
    this.addressService.editUserAddress(this.address , this.address.id)
    this.activeModal.close();
  }

  addAddress(){
    this.addressService.addUserAddress(this.address)
    this.activeModal.close();
  }
}
