import { Component, Input, OnInit, Output, EventEmitter, ViewChild, ElementRef, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CartService } from 'src/app/services/cart.service';
import { UserService } from 'src/app/services/user.service';
import { Product } from 'src/app/types/product.type';

@Component({
  selector: 'app-detail-modal',
  templateUrl: './detail-modal.component.html',
  styleUrls: ['./detail-modal.component.scss']
})
export class DetailModalComponent implements OnInit {
  @Input() successAdding: boolean;
  
  isModalOpen = false;
  progressActive = false;
  
  name;
  product;
  rating;
  
  constructor(
    private userService: UserService,
    private cartService: CartService,
    public dialogRef: MatDialogRef<DetailModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Product,
  ) {

    this.cartService.progressActive.subscribe(res => {
      this.progressActive = res;
    })
  }


  ngOnInit(): void {
    this.product = this.data;
    this.rating = this.data.rating;
    this.name = this.data.name;
  }

  get user() {
    return this.userService.getUser();
  }

  addToCart() {
    this.cartService.addToCart(this.product, this.user.id);
  }

  close() {
    this.dialogRef.close();
  }

}
