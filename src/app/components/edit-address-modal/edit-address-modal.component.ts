import { Component, Input, OnInit } from '@angular/core';
import { Address } from 'src/app/types/address.type';

@Component({
  selector: 'app-edit-address-modal',
  templateUrl: './edit-address-modal.component.html',
  styleUrls: ['./edit-address-modal.component.scss'],
})
export class EditAddressModalComponent implements OnInit {
  @Input() address: Address;

  editedData;

  constructor() {}

  ngOnInit(): void {
    setTimeout(() => {
      this.editedData = {
        addressName: this.address.addressName,
        streetName: this.address.streetName,
        suite: this.address.suite,
        city: this.address.city,
        country: this.address.country,
      };
    }, 100);
  }

  editData() {
    console.log(this.address);
    console.log('edited');
  }
}
