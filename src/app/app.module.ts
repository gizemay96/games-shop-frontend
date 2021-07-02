import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// Modules
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppModalsModule } from './modules/modals.module';
import { AppPartialModule } from './modules/partial.module';
import { AppPipesModule } from './modules/pipes.module';
import { AppBootstrapModule } from './modules/bootstrap.module';
import { AppMaterialModule } from './modules/material.module';

// Components
import { AppComponent } from './app.component';
import { UserInfoComponent } from './components/modals/profileTabs/user-info/user-info.component';
import { PreviousOrdersComponent } from './components/modals/profileTabs/previous-orders/previous-orders.component';
import { CouponsComponent } from './components/modals/profileTabs/coupons/coupons.component';

// Pages
import { CheckoutPageComponent } from './pages/checkout-page/checkout-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { AngularTiltModule } from 'angular-tilt';



@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    CheckoutPageComponent,
    ProfilePageComponent,
    UserInfoComponent,
    PreviousOrdersComponent,
    CouponsComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AngularTiltModule,
    // Custom Modules
    AppModalsModule,
    AppPartialModule,
    AppPipesModule,
    AppBootstrapModule,
    AppMaterialModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
