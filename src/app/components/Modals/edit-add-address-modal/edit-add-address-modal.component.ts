import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AddressService } from 'src/app/services/address.service';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { AutocomplateAddressService } from 'src/app/services/autocomplate-address.service';

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
    addressName: new FormControl('', [Validators.required]),
    suite: new FormControl('', [Validators.required]),
    streetName: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    country: new FormControl('', [Validators.required]),
    id: new FormControl(''),
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
    private autocomplateAddressService: AutocomplateAddressService
  ) {}

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

  editData() {
    this.loading = true;
    if (this.addressForm.valid) {
      this.addressService.editUserAddress(
        this.addressForm.value,
        this.addressForm.get('id').value
      );
      setTimeout(() => {
        this.loading = false;
        this.activeModal.close();
      }, 600);
    }
  }

  addAddress() {
    this.loading = true;
    if (this.addressForm.valid) {
      this.addressService.addUserAddress(this.addressForm.value);
      setTimeout(() => {
        this.loading = false;
        this.activeModal.close();
      }, 600);
    } else {
      this.invalidFormErrors = true;
      this.loading = false;
    }
  }

  closeModal(){
    this.activeModal.close();
  }
}
