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

  user;

  constructor(
    private userService : UserService
  ) {}

  ngOnInit(): void {
    this.user = this.userService.getUser();
    console.log(this.user);
  }
}
