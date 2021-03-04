import { Component, Input, OnInit, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActionService } from 'src/app/services/action.service';
import { CartService } from 'src/app/services/cart.service';
import { UserService } from 'src/app/services/user.service';
import { Product } from 'src/app/types/product.type';

@Component({
  selector: 'app-detail-modal',
  templateUrl: './detail-modal.component.html',
  styleUrls: ['./detail-modal.component.scss']
})
export class DetailModalComponent implements OnInit {
  @ViewChild('closeModal') private closeModal: ElementRef;
public close() {
        this.closeModal.nativeElement.click();      
}

  @Input() data: Product;
  @Input() rating;
  @Input() name;
  @Input() successAdding: boolean;
  isModalOpen = false;

  progressActive = false;
  constructor(
    private userService: UserService,
    private activeModal: NgbActiveModal,
    private cartService: CartService
  ) {

    this.cartService.progressActive.subscribe(res => {
      this.progressActive = res;
    })

  }
  

  ngOnInit(): void {
  }

  get user() {
    return this.userService.getUser();
  }

  addToCart() {
    this.cartService.addToCart(this.data, this.user.id);
  }

  // close() {
  //   this.activeModal.close();
  // }

}
