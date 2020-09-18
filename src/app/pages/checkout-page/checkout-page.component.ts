import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { OrderService } from 'src/app/services/order.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-checkout-page',
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.scss']
})
export class CheckoutPageComponent implements OnInit {

  cardName: string = "";
  cardNumber: string = "";
  expDate: string = "";
  cvc: string = "";
  selectedAddress: number;

  get user() {
    return this.userService.getUser();
  }

  get userCart(){
    return this.cartService.getUserCart();
  }

  get cartProducts(){
    return this.cartService.getCartProducts();
  }

  get totalQuantity() {
    return this.userCart.orders.reduce((total, order) => total + order.quantity, 0)
  }

  get getTotal() {
    if (this.cartProducts) {
      return this.cartProducts.reduce((total, product) => {
        const productOrder = this.userCart.orders.find(order => order.product === product.id)
  
        const productTotalPrice = product.price * (productOrder ? productOrder.quantity : 0)
  
        return total + productTotalPrice;
      }, 0)
    }
  }

  constructor(
    private userService:UserService,
    private cartService:CartService,
    private orderService:OrderService
  ) { }

  ngOnInit(): void {
  }

}
