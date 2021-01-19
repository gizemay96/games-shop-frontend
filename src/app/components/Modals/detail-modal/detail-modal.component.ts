import { Component, Input, OnInit, Output , EventEmitter } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Product } from 'src/app/types/product.type';

@Component({
  selector: 'app-detail-modal',
  templateUrl: './detail-modal.component.html',
  styleUrls: ['./detail-modal.component.scss']
})
export class DetailModalComponent implements OnInit {

  @Input() data:Product;
  @Input() rating;
  @Input() successAdding:boolean;
  @Output() addToCart = new EventEmitter();

  constructor(
    private userService : UserService
  ) { }

  ngOnInit(): void {
  }

  get user() {
    return this.userService.getUser();
  }

}
