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
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DetailModalComponent } from './components/Modals/detail-modal/detail-modal.component';
import { CheckoutPageComponent } from './pages/checkout-page/checkout-page.component';
import { OrderItemComponent } from './components/order-item/order-item.component';
import { PaymentComponent } from './components/payment/payment.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { EditProfileModalComponent } from './components/Modals/edit-profile-modal/edit-profile-modal.component';
import { EditAddressModalComponent } from './components/Modals/edit-address-modal/edit-address-modal.component';


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
    OrderItemComponent,
    PaymentComponent,
    ProfilePageComponent,
    EditProfileModalComponent,
    EditAddressModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
  ],
  providers: [NgbActiveModal],
  bootstrap: [AppComponent]
})
export class AppModule { }
