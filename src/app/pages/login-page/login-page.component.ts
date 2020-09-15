import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { AuthResponse } from 'src/app/types/authResponse.type';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  isLoading: boolean = false;

  loginForm = {
    identifier: '',
    password: '',
  };

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  login() {
    this.isLoading = true;
    this.authService
      .login(this.loginForm)
      .subscribe((response: AuthResponse) => {
        this.authService.setToken(response.jwt);
        this.userService.setUser(response.user);

        this.isLoading = false;

        this.loginForm.identifier = '';
        this.loginForm.password = '';
        this.router.navigateByUrl('/');
      });
  }
}
