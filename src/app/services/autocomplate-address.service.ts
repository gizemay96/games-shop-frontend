import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment as env } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AutocomplateAddressService {
  constructor(private http: HttpClient) {}

  httpOptions = {
    headers: { Authorization: `Bearer ${env.countryCityDataToken}` },
  };

  getCountries() {
    return this.http.get(
      `https://www.universal-tutorial.com/api/countries/`,
      this.httpOptions
    );
  }

  getCities(country) {
    console.log('service',country)
    return this.http.get(
      `https://www.universal-tutorial.com/api/states/${country}`,
      this.httpOptions
    );
  }

}
