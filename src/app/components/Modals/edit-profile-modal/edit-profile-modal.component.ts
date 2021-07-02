import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-profile-modal',
  templateUrl: './edit-profile-modal.component.html',
  styleUrls: ['./edit-profile-modal.component.scss'],
})
export class EditProfileModalComponent implements OnInit {
  
  editForm = new FormGroup({
    username: new FormControl(this.data.username ? this.data.username : '', [
      Validators.required,
      Validators.minLength(3),
    ]),
    name: new FormControl(this.data.name ? this.data.name : '', [
      Validators.minLength(3),
    ]),
    lastName: new FormControl(this.data.lastName ? this.data.lastName : '', [
      Validators.minLength(2),
    ]),
    email: new FormControl(this.data.email ? this.data.email : '', [Validators.required, Validators.email]),
    phone: new FormControl(this.data.phone ? this.data.phone : ''),
  });
  
  invalidFormErrors = false;
  errorActive: boolean = false;
  isLoading: boolean = false;

  get usernameErrors() {
    return this.editForm.controls.username;
  }
  get nameErrors() {
    return this.editForm.controls.name;
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

  get ServerErrors() {
    return this.userService.getServerErrors();
  }

  constructor(
    private userService: UserService,
    private router: Router,
    public activeModal: NgbActiveModal,
    public dialogRef: MatDialogRef<EditProfileModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  ngOnInit(): void {}

  editData() {
    if (this.editForm.valid) {
      this.isLoading = true;
      this.userService.editUser(this.editForm.value);
      setTimeout(() => {
        if (this.ServerErrors) {
          this.errorActive = true;
          this.isLoading = false;
          return;
        } 
        else {
          this.errorActive = false;
          this.isLoading = false;
          this.activeModal.close();
        }
      }, 1000);
    } else {
      this.invalidFormErrors = true;
      this.isLoading = false;
    }
  }

  closeModal(){
    this.dialogRef.close();
  }
}
