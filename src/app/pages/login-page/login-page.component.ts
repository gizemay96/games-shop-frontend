import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { UserService } from 'src/app/services/user.service';
import { AuthResponse } from 'src/app/types/authResponse.type';
import { FormGroup, FormControl , Validators } from '@angular/forms';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  isLoading: boolean = false;

  loginForm = new FormGroup({
    identifier:new FormControl("" , [Validators.required , Validators.minLength(3)]),
    password:new FormControl("",[Validators.required , Validators.minLength(6)])
  });

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  get identifierErrors(){
    return this.loginForm.controls.identifier
  }

  get passwordErrors(){
    return this.loginForm.controls.password
  }

  login() {
    console.log(this.loginForm)
   if(this.loginForm.valid){
    this.isLoading = true;
    this.authService
      .login(this.loginForm.value)
      .subscribe((response: AuthResponse) => {
        this.authService.setToken(response.jwt);
        this.userService.setUser(response.user);
        this.cartService.fetchUserCart(response.user.id)

        this.isLoading = false;

        this.loginForm.reset()

        this.userService.getDetails();
        this.router.navigateByUrl('/');
      });
   }
  }
}
