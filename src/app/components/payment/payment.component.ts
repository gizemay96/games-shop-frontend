import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CartService } from 'src/app/services/cart.service';
import { Address } from 'src/app/types/address.type';
import { Product } from 'src/app/types/product.type';
import { User } from 'src/app/types/user.type';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
})
export class PaymentComponent implements OnInit {
  @Input() CartProducts: Product[];
  @Input() DeliveryAddress: Address;
  @Input() user: User;
  paymentSuccess: boolean = false;
  noAddress: boolean = false;
  noOrder: boolean = false;
  paymentErrors: boolean = false;
  bougthOrderCount: number;
  invalidFormErrors = false;

  // ------------------ FOR FLIP CARD ---------------- //
  creditCartFront: boolean = true;

  // ------------------ PAYMENT FORM ---------------- //
  paymentForm = new FormGroup({
    cardName: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
    ]),
    cardNumber: new FormControl('', [
      Validators.required,
      Validators.minLength(16),
    ]),
    expDate: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
    ]),
    cvc: new FormControl('', [Validators.required, Validators.minLength(3)]),
  });

  // ------------------ GETTER METHODS ---------------- //
  get cardNameControl() {
    return this.paymentForm.controls.cardName;
  }
  get cardNumberControl() {
    return this.paymentForm.controls.cardNumber;
  }
  get expDateControl() {
    return this.paymentForm.controls.expDate;
  }
  get cvcControl() {
    return this.paymentForm.controls.cvc;
  }


  constructor(private cartService: CartService,
  ) { }

  ngOnInit(): void { }

  showCVC() {
    this.creditCartFront = false;
  }

  hideCVC() {
    this.creditCartFront = true;
  }

  send() {
    if (!this.paymentForm.valid) {
      this.invalidFormErrors = true;
    } else if (this.paymentForm.valid && !this.DeliveryAddress) {
      this.paymentErrors = true;
      this.noAddress = true;
      this.bougthOrderCount = null;
      return;
    } else if (this.paymentForm.valid && !this.CartProducts) {
      this.paymentErrors = true;
      this.noOrder = true;
      this.bougthOrderCount = null;
      return;
    } else if (this.paymentForm.valid) {
      this.paymentErrors = false;
      this.bougthOrderCount = this.CartProducts.length;
      this.paymentSuccess = true;
      this.paymentForm.reset();
      this.cartService.resetCart(this.user.id);
    }
    setTimeout(() => {
      this.paymentSuccess = false;
      this.bougthOrderCount = null;
    }, 6000);
  }



}
