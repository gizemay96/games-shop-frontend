import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExpDatePipe } from 'src/app/pipes/exp-date.pipe';
import { CardNumberPipe } from 'src/app/pipes/card-number.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppBootstrapModule } from './bootstrap.module';



@NgModule({
  declarations: [
    ExpDatePipe,
    CardNumberPipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AppBootstrapModule
  ],
  exports: [
    ExpDatePipe,
    CardNumberPipe
  ],
})
export class AppPipesModule { }
