import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

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

  constructor() {}

  ngOnInit(): void {}
}
