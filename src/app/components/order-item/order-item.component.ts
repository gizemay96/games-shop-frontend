import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { Order } from 'src/app/types/order.type';
import { Product } from 'src/app/types/product.type';

@Component({
  selector: 'app-order-item',
  templateUrl: './order-item.component.html',
  styleUrls: ['./order-item.component.scss']
})
export class OrderItemComponent implements OnInit {

  @Input() product: Product;
  @Input() loadingProductId: number;
  @Output() decrementClick = new EventEmitter();
  @Output() incrementClick = new EventEmitter();
  @Output() deleteProduct = new EventEmitter();

  order: Order
  itemQuantity: number;

  constructor(
    private cartService: CartService,
  ) { }

  get userCart() {
    return this.cartService.getUserCart();
  }

  ngOnInit(): void {
    const userCart = this.cartService.getUserCart()
    this.order = userCart.orders.find(order => order.product === this.product.id);

    this.itemQuantity = this.order ? this.order.quantity : 0;
  }

}
