import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserModel } from '../../models/user-model';
import { FormService } from '../../services/form-validator.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})

export class UserComponent implements OnInit {
  users: UserModel[] = [];
  isEditMode: boolean = false;
  userForm!: FormGroup;

  firstName!: FormControl;
  lastName!: FormControl;
  dateOfBirth!: FormControl;
  emailAddress!: FormControl;
  phoneNumber!: FormControl;

  public formErrors = {
    lastName: '',
    firstName: '',
    phoneNumber: '',
    emailAddress: '',
    dateOfBirth: '',
  };

  constructor(
    private userService: UserService,
    private formService: FormService) {
  }

  ngOnInit(): void {
    this.users = this.userService.getHeroes();
    this.createFormControls();
    this.createForm();
  }

  public async onSubmit() {
    this.formService.markFormGroupTouched(this.userForm);
    debugger;
    if (this.userForm.valid) {
      const httpResponse = await this.userService.createUser(this.userForm).toPromise();;
      if (httpResponse != null && httpResponse.success) {
        //mat snack bar service for success
      } else {
        //mat snack bar service for error
      }
    }
    else {
      this.formErrors = this.formService.validateForm(this.userForm, this.formErrors, false)
    }
  }

  createFormControls() {
    this.firstName = new FormControl('', Validators.required);
    this.lastName = new FormControl('', Validators.required);
    this.dateOfBirth = new FormControl('', Validators.required);
    this.emailAddress = new FormControl('', [
      Validators.required
    ]);
    this.phoneNumber = new FormControl('', Validators.required);
  }

  createForm() {
    this.userForm = new FormGroup({
      firstName: this.firstName,
      lastName: this.lastName,
      dateOfBirth: this.dateOfBirth,
      emailAddress: this.emailAddress,
      phoneNumber: this.phoneNumber,
    });
  }

  onEdit(): void {
    this.isEditMode = !this.isEditMode
  }
}