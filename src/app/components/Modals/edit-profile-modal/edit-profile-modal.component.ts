import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/types/user.type';

@Component({
  selector: 'app-edit-profile-modal',
  templateUrl: './edit-profile-modal.component.html',
  styleUrls: ['./edit-profile-modal.component.scss'],
})
export class EditProfileModalComponent implements OnInit {
  // ------------------ PROFILE FORM ---------------- //
  editForm = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    lastName: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.required]),
  });

  // ------------------ GET ERRORS ---------------- //
  get usernameErrors() {
    return this.editForm.controls.username;
  }

  get lastNameErrors() {
    return this.editForm.controls.lastName;
  }

  get emailErrors() {
    return this.editForm.controls.email;
  }

  get phoneErrors() {
    return this.editForm.controls.phone;
  }

  constructor(
    private userService: UserService,
    private router: Router,
    public activeModal: NgbActiveModal
  ) {}

  ngOnInit(): void {}

  editData() {
    if (this.editForm.valid) {
      this.userService.editUser(this.editForm.value);
      this.activeModal.close();
    }
  }
}
