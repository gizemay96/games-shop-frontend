import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/types/user.type';


@Component({
  selector: 'app-edit-profile-modal',
  templateUrl: './edit-profile-modal.component.html',
  styleUrls: ['./edit-profile-modal.component.scss'],
})
export class EditProfileModalComponent implements OnInit {
  @Input() user:User;


  constructor(private userService: UserService, private router:Router ,  public activeModal: NgbActiveModal) {}

  ngOnInit(): void {

  }

  editData() {
    this.userService.editUser(this.user);
    this.activeModal.close()
  }
  
}
