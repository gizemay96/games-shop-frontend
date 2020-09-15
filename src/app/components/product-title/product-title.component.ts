import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-title',
  templateUrl: './product-title.component.html',
  styleUrls: ['./product-title.component.scss']
})
export class ProductTitleComponent implements OnInit {

  @Input() title;
  @Input() categoryCount;

  constructor() { }

  ngOnInit(): void {
  }

}
