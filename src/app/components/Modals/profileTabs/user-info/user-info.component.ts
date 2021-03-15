import { Component, Input, OnInit, Output , EventEmitter} from '@angular/core';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {
  @Input() userAddresses;
  @Input() user;
  @Output() openEditProfileModal = new EventEmitter();
  @Output() openAddAddressModal = new EventEmitter();
  @Output() openEditAddressModal = new EventEmitter();
  @Output() deleteAddress = new EventEmitter();


  constructor() { }

  ngOnInit(): void {
  }

}
