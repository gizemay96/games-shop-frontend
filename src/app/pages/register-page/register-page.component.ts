import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { UserService } from 'src/app/services/user.service';
import { AuthResponse } from 'src/app/types/authResponse.type';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss'],
})
export class RegisterPageComponent implements OnInit {
  isLoading: boolean = false;

  regForm = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  register() {
    this.isLoading = true;
    const registerData = {
      username: this.regForm.username,
      email: this.regForm.email,
      password: this.regForm.password,
    };
    this.authService
      .register(registerData)
      .subscribe((response: AuthResponse) => {
        this.authService.setToken(response.jwt);
        this.userService.setUser(response.user);
        this.cartService.createCart(response.user.id);

        this.regForm.username = '';
        this.regForm.email = '';
        this.regForm.password = '';
        this.regForm.confirmPassword = '';

        this.isLoading = false;
        this.cartService.fetchUserCart(response.user.id);

        this.router.navigateByUrl('/');
      });
  }
}
