import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { timeoutWith } from 'rxjs/operators';
import { Order } from 'src/app/types/order.type';
import { Product } from 'src/app/types/product.type';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
})
export class PaymentComponent implements OnInit {

  @Input() CartProducts:Product[];
  paymentSuccess:boolean = false;
 
 // ------------------ FOR FLIP CARD ---------------- // 
  creditCartFront: boolean = true;

  // ------------------ PAYMENT FORM ---------------- // 
  paymentForm = new FormGroup({
    cardName: new FormControl('',[Validators.required , Validators.minLength(5)]),
    cardNumber: new FormControl('',[Validators.required , Validators.minLength(16)]),
    expDate: new FormControl('',[Validators.required , Validators.minLength(4)]),
    cvc: new FormControl('',[Validators.required , Validators.minLength(3)]),
  });


  // ------------------ GETTER METHODS ---------------- // 
  get cardNameControl(){
    return this.paymentForm.controls.cardName
  }
  get cardNumberControl(){
    return this.paymentForm.controls.cardNumber
  }
  get expDateControl(){
    return this.paymentForm.controls.expDate
  }
  get cvcControl(){
    return this.paymentForm.controls.cvc
  }




  constructor() {}

  ngOnInit(): void {}

  showCVC() {
    this.creditCartFront = false;
  }

  hideCVC() {
    this.creditCartFront = true;
  }

  send(){
    if(this.paymentForm.valid && this.CartProducts){
      this.paymentSuccess = true;

      setTimeout(() => {
        this.paymentSuccess = false;
      }, 6000);
    }
  }
}
