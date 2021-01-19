import { Injectable } from '@angular/core';
import { Cart } from '../types/cart.type';
import { Product } from '../types/product.type';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private userCart: Cart;
  private cartProducts: Product[];

  constructor() { }
}
