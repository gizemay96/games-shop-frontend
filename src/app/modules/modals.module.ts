import { NgModule } from '@angular/core';

// Modules
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '../app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppBootstrapModule } from './bootstrap.module';
import { AppPartialModule } from './partial.module';
import { AppPipesModule } from './pipes.module';
import { AppMaterialModule } from './material.module';

// Components
import { DetailModalComponent } from 'src/app/components/Modals/detail-modal/detail-modal.component';
import { EditProfileModalComponent } from 'src/app/components/Modals/edit-profile-modal/edit-profile-modal.component';
import { EditAddressModalComponent } from 'src/app/components/Modals/edit-add-address-modal/edit-add-address-modal.component';
import { ConfirmationModalComponent } from 'src/app/components/Modals/confirmation-modal/confirmation-modal.component';
import { LoginModalComponent } from 'src/app/components/Modals/login-modal/login-modal.component';
import { RegisterModalComponent } from 'src/app/components/Modals/register-modal/register-modal.component';





@NgModule({
  declarations: [
    DetailModalComponent,
    EditProfileModalComponent,
    EditAddressModalComponent,
    ConfirmationModalComponent,
    LoginModalComponent,
    RegisterModalComponent,
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    // Custom Modules
    AppPartialModule,
    AppPipesModule,
    AppBootstrapModule,
    AppMaterialModule
  ],
  exports:[
    DetailModalComponent,
    EditProfileModalComponent,
    EditAddressModalComponent,
    ConfirmationModalComponent,
    LoginModalComponent,
    RegisterModalComponent,
  ],
})
export class AppModalsModule { }
