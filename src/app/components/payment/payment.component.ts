import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {

  cardName: string = '';
  cardNumber: string = '';
  expDate: string = '';
  cvc: string = '';

  creditCartFront:boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

  
  showCVC(){
    this.creditCartFront = false;
  }

  hideCVC(){
    this.creditCartFront = true;
  }

}
