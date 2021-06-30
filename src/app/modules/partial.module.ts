import { NgModule } from '@angular/core';

// Modules
import { AppRoutingModule } from '../app-routing.module';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppPipesModule } from './pipes.module';
import { AppMaterialModule } from './material.module';
import { AppBootstrapModule } from './bootstrap.module';

// Components
import { NavbarComponent } from 'src/app/components/navbar/navbar.component';
import { ProductCardComponent } from 'src/app/components/product-card/product-card.component';
import { ProductTitleComponent } from 'src/app/components/product-title/product-title.component';
import { OrderItemComponent } from 'src/app/components/order-item/order-item.component';
import { PaymentComponent } from 'src/app/components/payment/payment.component';




@NgModule({
  declarations: [
    NavbarComponent,
    ProductCardComponent,
    ProductTitleComponent,
    OrderItemComponent,
    PaymentComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    // Custom Modules
    AppPipesModule,
    AppMaterialModule,
    AppBootstrapModule
  ],
  exports: [
    NavbarComponent,
    ProductCardComponent,
    ProductTitleComponent,
    OrderItemComponent,
    PaymentComponent
  ],
})
export class AppPartialModule { }
