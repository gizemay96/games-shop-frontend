import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { UserService } from 'src/app/services/user.service';
import { DetailModalComponent } from '../Modals/detail-modal/detail-modal.component';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent implements OnInit {
  @Input() data;
  @Input() page;
  @Input() dataCount;
  @Input() productAdding;
  @Output() previous = new EventEmitter();
  @Output() next = new EventEmitter();
  @Output() selectedProd = new EventEmitter();
  @Output() addToCart = new EventEmitter();

  constructor(
    private userService : UserService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
  }

  get user() {
    return this.userService.getUser();
  }


  openModal(product){
    const data = {data: product , panelClass:"detailProduct",}
    const dialogRef = this.dialog.open(DetailModalComponent , data)
    console.log('sdfsdf')
  }

}
