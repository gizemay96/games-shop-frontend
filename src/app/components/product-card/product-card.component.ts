import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent implements OnInit {
  @Input() data;
  @Input() page;
  @Input() dataCount;
  @Output() previous = new EventEmitter();
  @Output() next = new EventEmitter();
  @Output() selectedProd = new EventEmitter();
  @Output() addToCart = new EventEmitter();

  constructor(
    private userService : UserService
  ) {}

  ngOnInit(): void {
  }

  get user() {
    return this.userService.getUser();
  }
}
