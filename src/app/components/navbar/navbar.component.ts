import { Component, Input, OnInit, Output , EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
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
  @Output() closeModal = new EventEmitter();
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
    public dialog: MatDialog
  ) {}

  ngOnInit() {}

  openLogin() {
    const data = {panelClass:"loginModal"}
    const dialogRef = this.dialog.open(LoginModalComponent , data)
  }

  openRegister(){
    const data = {panelClass:"registerModal"}
    const dialogRef = this.dialog.open(RegisterModalComponent , data)
  }

  logout() {
    this.authService.logout();
  }
}
