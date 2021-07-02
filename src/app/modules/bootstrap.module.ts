import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NgbModule
  ],
  exports:[
    NgbModule
  ],
  providers:[
    NgbActiveModal
  ]
})
export class AppBootstrapModule { }
