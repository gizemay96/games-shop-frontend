import { TestBed } from '@angular/core/testing';

import { AutocomplateAddressService } from './autocomplate-address.service';

describe('AutocomplateAddressService', () => {
  let service: AutocomplateAddressService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AutocomplateAddressService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
