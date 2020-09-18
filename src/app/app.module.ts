import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { ProductTitleComponent } from './components/product-title/product-title.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DetailModalComponent } from './components/detail-modal/detail-modal.component';
import { CheckoutPageComponent } from './pages/checkout-page/checkout-page.component';
import { OrderItemComponent } from './components/order-item/order-item.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    LoginPageComponent,
    NavbarComponent,
    RegisterPageComponent,
    ProductCardComponent,
    ProductTitleComponent,
    DetailModalComponent,
    CheckoutPageComponent,
    OrderItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
