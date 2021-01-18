import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.scss'],
})
export class ConfirmationModalComponent implements OnInit {
  @Input() title;
  @Output() action = new EventEmitter();

  constructor(private activeModal: NgbActiveModal) {}

  ngOnInit(): void {}

  close(action: boolean) {
    this.activeModal.close(action);
  }
}
