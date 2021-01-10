import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { UserService } from 'src/app/services/user.service';
import { AuthResponse } from 'src/app/types/authResponse.type';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss'],
})
export class LoginModalComponent implements OnInit {
  isLoading: boolean = false;

  loginForm = new FormGroup({
    identifier: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private cartService: CartService,
    private router: Router,
    private activeModal: NgbActiveModal
  ) { }

  ngOnInit(): void { }

  get identifierErrors() {
    return this.loginForm.controls.identifier;
  }

  get passwordErrors() {
    return this.loginForm.controls.password;
  }

  serverErrors;
  errorActive: boolean = false;

  login() {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.authService.login(this.loginForm.value).subscribe(
        (response: AuthResponse) => {
          console.log(response);
          window.localStorage.setItem('user', JSON.stringify(response.user));
          this.authService.setToken(response.jwt);
          this.userService.setUser(response.user);
          this.cartService.fetchUserCart(response.user.id);

          this.isLoading = false;

          this.loginForm.reset();

          this.userService.getDetails();
          this.activeModal.close();
          this.router.navigateByUrl('/');
        },
        (error) => {
          this.serverErrors = error.error.message[0].messages[0].message;
          this.errorActive = true;
          this.isLoading = false;
        }
      );
    }
  }


  close() {
    this.router.navigateByUrl('/');
    this.activeModal.close();

  }



}
