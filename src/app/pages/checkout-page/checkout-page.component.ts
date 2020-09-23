import { Component, OnInit } from '@angular/core';
import { AddressService } from 'src/app/services/address.service';
import { CartService } from 'src/app/services/cart.service';
import { OrderService } from 'src/app/services/order.service';
import { UserService } from 'src/app/services/user.service';
import { Cart } from 'src/app/types/cart.type';
import { Product } from 'src/app/types/product.type';

@Component({
  selector: 'app-checkout-page',
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.scss'],
})
export class CheckoutPageComponent implements OnInit {
  selectedAddress: number;
  radioButtonActive: number;

  get user() {
    return this.userService.getUser();
  }

  get userCart() {
    return this.cartService.getUserCart();
  }

  get cartProducts() {
    return this.cartService.getCartProducts();
  }

  get totalQuantity() {
    return this.userCart.orders.reduce(
      (total, order) => order.quantity + total,
      0
    );
  }

  get userAddresses() {
    return this.addressService.getUserAddress();
  }

  get getTotal() {
    if (this.cartProducts) {
      return this.cartProducts.reduce((total, product) => {
        const productOrder = this.userCart.orders.find(
          (order) => order.product === product.id
        );

        const productTotalPrice =
          product.price * (productOrder ? productOrder.quantity : 0);

        return total + productTotalPrice;
      }, 0);
    }
  }

  constructor(
    private userService: UserService,
    private cartService: CartService,
    private orderService: OrderService,
    private addressService: AddressService
  ) {}

  ngOnInit(): void {
    setTimeout(() => this.addressService.fetchUserAddress(), 100);
  }

  removeFromCart(product: Product) {
    this.cartService.removeFromCart(product, this.user.id);
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product, this.user.id);
  }

  radioButtonToActive(addressId) {
    this.radioButtonActive = addressId;
    this.selectedAddress = addressId;
  }

  resetCart(userCart: Cart) {
    this.cartService.resetCart(userCart);
  }
}
