import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { UserService } from 'src/app/services/user.service';
import { LoginModalComponent } from '../Modals/login-modal/login-modal.component';
import { RegisterModalComponent } from '../Modals/register-modal/register-modal.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  @Input() positionFix: boolean = true;
  isOpenToggler:boolean = false;

  // ------------------ GETTER METHODS ---------------- //
  get user() {
    return this.userService.getUser();
  }

  get userCart() {
    return this.cartService.getUserCart();
  }

  get cartLength() {
    return this.userCart.orders.reduce(
      (total, order) => order.quantity + total,
      0
    );
  }

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private cartService: CartService,
    private modalService: NgbModal
  ) {}

  ngOnInit() {}

  openLogin() {
    this.modalService.open(LoginModalComponent, {
      centered: true,
      windowClass: 'login-modal'
    });
  }

  openRegister(){
    this.modalService.open(RegisterModalComponent, {
      centered: true,
      windowClass: 'register-modal'
    });
  }

  logout() {
    this.authService.logout();
  }
}
