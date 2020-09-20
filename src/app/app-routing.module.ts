import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CheckoutPageComponent } from './pages/checkout-page/checkout-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';


const routes: Routes = [
  { path:"" , component:HomePageComponent },
  { path:"login" , component:LoginPageComponent },
  { path:"register" , component:RegisterPageComponent },
  { path:"checkout" , component:CheckoutPageComponent },
  { path:"profile" , component:ProfilePageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
