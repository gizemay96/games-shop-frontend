import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CartService } from './cart.service';
@Injectable({
  providedIn: 'root',
})
export class ActionService {


  constructor(
    private http: HttpClient,
    private cartService: CartService,
  ) {}


}
