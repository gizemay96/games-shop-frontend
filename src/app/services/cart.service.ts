import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cart } from '../types/cart.type';
import { Product } from '../types/product.type';
import { environment as env } from '../../environments/environment';
import { OrderService } from './order.service';
import { Order } from '../types/order.type';
import { catchError, map } from 'rxjs/operators';
import { of, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})


export class CartService {
  
  
  public progressActive: Subject<boolean> = new Subject<boolean>();
  private userCart: Cart;
  private cartProducts: Product[];
  
  
  constructor(private http: HttpClient, private orderService: OrderService) { }
  
  fetchUserCart(userId: number) {
    this.http
      .get(`${env.cartsApiURL}?user=${userId}`)
      .subscribe((response: Cart) => {
        this.userCart = response[0];
        this.fetchCartDetailsById(this.userCart.orders);
      });
  }

  fetchCartDetailsById(orders?) {
    if (orders) {
      const query = orders.map((order) => `id_in=${order.product}`).join('&');
      if (query) {
        this.http
          .get(`${env.productsApiURL}?${query}`)
          .subscribe((response: Product[]) => {
            this.cartProducts = response;
          });
      }
    }
    this.progressActive.next(false);
  }

  createCart(userId) {
    const token = window.localStorage.getItem('token');
    const httpOptions = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const newCart = {
      user: userId,
      orders: [],
    };

    this.http
      .post(`${env.cartsApiURL}`, newCart, httpOptions)
      .subscribe((response: Cart) => {
        this.userCart = response;
        this.fetchUserCart(userId);
      });
  }

  addToCart(newProduct: Product, userId: number) {
    this.progressActive.next(true);
    const existingOrder = this.userCart.orders.find(
      (order) => order.product === newProduct.id
    );

    if (existingOrder) {
      this.orderService
        .updateOrder(existingOrder, existingOrder.quantity + 1)
        .subscribe((response) => {
          this.fetchUserCart(userId);
        });
    } else {
      this.orderService
        .createOrder(newProduct.id, userId)
        .subscribe((response: Order) => {
          this.updateCart(response.id, userId).subscribe((response) => {
            this.fetchUserCart(userId);
          });
        });
    }
  }

  updateCart(orderId: number, userId: number) {
    const token = window.localStorage.getItem('token');
    const httpOptions = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const updatedCart = {
      ...this.userCart,
      user: userId,
      orders: [...this.userCart.orders, orderId],
    };

    return this.http.put(
      `${env.cartsApiURL}/${this.userCart.id}`,
      updatedCart,
      httpOptions
    );
  }

  removeFromCart(product: Product, userId: number) {
    const existingOrder = this.userCart.orders.find(
      (order) => order.product === product.id
    );

    if (!existingOrder) return;

    if (existingOrder.quantity > 1) {
      this.orderService
        .updateOrder(existingOrder, existingOrder.quantity - 1)
        .subscribe((response) => {
          this.fetchUserCart(userId);
        });
    } else {
      this.orderService.deleteOrder(existingOrder.id).subscribe((response) => {
        this.fetchUserCart(userId);
      });
    }
  }

  removeProduct(product: Product, userId: number) {
    const existingOrder = this.userCart.orders.find(
      (order) => order.product === product.id
    );

    this.orderService.deleteOrder(existingOrder.id).subscribe((response) => {
      this.fetchUserCart(userId);
    });
  }

  resetCart(userId) {
    this.userCart.orders.map((p) => {
      const orderId = p.id;
      this.orderService.deleteAllOrder(orderId).subscribe((response) => {
        if (response) {
          this.cartProducts = null;
          this.userCart.orders = null;
          this.fetchUserCart(userId);
          this.fetchCartDetailsById(this.userCart.orders);
        }
      });
    });
  }

  getUserCart() {
    return this.userCart;
  }

  getCartProducts() {
    return this.cartProducts;
  }
}
