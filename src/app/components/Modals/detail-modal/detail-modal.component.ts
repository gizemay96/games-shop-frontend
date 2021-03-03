import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
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

  @Input() data: Product;
  @Input() rating;
  @Input() name;
  @Input() successAdding: boolean;

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

  close() {
    this.activeModal.close();
  }

}
