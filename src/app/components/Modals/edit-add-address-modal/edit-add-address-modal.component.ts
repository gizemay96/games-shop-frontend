import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AddressService } from 'src/app/services/address.service';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { AutocomplateAddressService } from 'src/app/services/autocomplate-address.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-address-modal',
  templateUrl: './edit-add-address-modal.component.html',
  styleUrls: ['./edit-add-address-modal.component.scss'],
})
export class EditAddressModalComponent implements OnInit {
  loading;
  invalidFormErrors

  // ------------------ ADDRESS FORM ---------------- // 
  addressForm = new FormGroup({
    addressName: new FormControl(this.data.addressName ? this.data.addressName : '', [Validators.required]),
    suite: new FormControl(this.data.suite ? this.data.suite : '', [Validators.required]),
    streetName: new FormControl(this.data.streetName ? this.data.streetName : '', [Validators.required]),
    city: new FormControl(this.data.city ? this.data.city : '', [Validators.required]),
    country: new FormControl(this.data.country ? this.data.country : '', [Validators.required]),
    id: new FormControl(this.data.id ? this.data.id : ''),
  });


  // ------------------ GET ERRORS ---------------- // 
  get nameErrors() {
    return this.addressForm.controls.addressName;
  }
  get suiteErrors() {
    return this.addressForm.controls.suite;
  }
  get streetNameErrors() {
    return this.addressForm.controls.streetName;
  }
  get cityErrors() {
    return this.addressForm.controls.city;
  }
  get countryErrors() {
    return this.addressForm.controls.country;
  }


  // ------------------ FORM AUTOCOMPLATE ---------------- // 
  states = [];
  cities = [];

  searchCountry = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(100),
      distinctUntilChanged(),
      map((term) =>
        term.length <= 1
          ? []
          : this.states[0]
            .filter((v) => v.toLowerCase().indexOf(term.toLowerCase()) > -1)
            .slice(0, 15)
      )
    );

  searchCity = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(100),
      distinctUntilChanged(),
      map((term) =>
        term.length <= 1
          ? []
          : this.cities[0]
            .filter((v) => v.toLowerCase().indexOf(term.toLowerCase()) > -1)
            .slice(0, 15)
      )
    );


  constructor(
    public activeModal: NgbActiveModal,
    private addressService: AddressService,
    private autocomplateAddressService: AutocomplateAddressService,
    public dialogRef: MatDialogRef<EditAddressModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {
    this.loading = true;
    this.autocomplateAddressService.getToken();
    this.states = [];
    setTimeout(() => {
      this.autocomplateAddressService
        .getCountries()
        .subscribe((response: any) => {
          this.states.push(response.map((a) => a.country_name));
        });
      this.loading = false;
    }, 1200);
  }

  // ------------------ FUNCTIONS ---------------- // 

  getCities() {
    if (this.cities) {
      this.cities = [];
    }
    this.autocomplateAddressService
      .getCities(this.addressForm.get('country').value)
      .subscribe((response: any) => {
        this.cities.push(response.map((a) => a.state_name));
      });
  }

  saveAddress() {
    if (this.addressForm.valid) {
      if (this.addressForm.controls['id'].value) {
        this.editData();
      } else {
        this.addAddress();
      }
    } else {
      this.invalidFormErrors = true;
      this.loading = false;
    }


  }

  editData() {
    this.loading = true;

    this.addressService.editUserAddress(
      this.addressForm.value,
      this.addressForm.get('id').value
    );
    setTimeout(() => {
      this.loading = false;
      this.dialogRef.close();
    }, 600);
  }

  addAddress() {
    this.loading = true;

    this.addressService.addUserAddress(this.addressForm.value);
    setTimeout(() => {
      this.loading = false;
      this.dialogRef.close();
    }, 600);

  }

  closeModal() {
    this.dialogRef.close();
  }
}
