import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { UserService } from 'src/app/services/user.service';
import { AuthResponse } from 'src/app/types/authResponse.type';

@Component({
  selector: 'app-register-modal',
  templateUrl: './register-modal.component.html',
  styleUrls: ['./register-modal.component.scss'],
})
export class RegisterModalComponent implements OnInit {
  isLoading: boolean = false;
  regForm = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    lastName: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
    confirmPassword: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  get usernameErrors() {
    return this.regForm.controls.username;
  }

  get lastNameErrors() {
    return this.regForm.controls.lastName;
  }

  get emailErrors() {
    return this.regForm.controls.email;
  }

  get passwordErrors() {
    return this.regForm.controls.password;
  }

  get confirmPassErrors() {
    return this.regForm.controls.confirmPassword;
  }
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private cartService: CartService,
    private router: Router,
    private activeModal: NgbActiveModal
  ) {}

  ngOnInit(): void {}

  register() {
    if (this.regForm.valid) {
      this.isLoading = true;
      const registerData = {
        username: this.regForm.get('username').value,
        lastName: this.regForm.get('lastName').value,
        email: this.regForm.get('email').value,
        password: this.regForm.get('password').value,
      };
      this.authService
        .register(registerData)
        .subscribe((response: AuthResponse) => {
          this.authService.setToken(response.jwt);
          this.userService.setUser(response.user);
          this.cartService.createCart(response.user.id);

          this.regForm.reset();

          this.isLoading = false;
          this.userService.getDetails();
          this.cartService.fetchUserCart(response.user.id);

          this.router.navigateByUrl('/');
          this.activeModal.close();
        });
    }
  }

  close() {
    this.router.navigateByUrl('/');
    this.activeModal.close();
  }
}