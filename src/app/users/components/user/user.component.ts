import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserModel } from '../../models/user-model';
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
  minDate: Date;
  maxDate: Date;


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
    private snackBar: MatSnackBar) {

    const currentYear = new Date().getFullYear();
    this.minDate = new Date(currentYear - 200, 0, 1);
    this.maxDate = new Date(currentYear -7);
  }

  ngOnInit(): void {
    this.users = this.userService.getHeroes();
    this.createFormControls();
    this.createForm();
  }

  public async onSubmit() {
    debugger;
    this.userForm.markAsTouched();
    if (this.userForm.valid) {
      const httpResponse = await this.userService.createUser(this.userForm).toPromise();;
      if (httpResponse != null && httpResponse.success) {
        debugger;     
        this.openSnackBar("Succesfully created user", "Ok" )
        
      } else {
        this.openSnackBar("Error trying to create user", "Ok" )
      }
      this.userForm.reset();
      this.onEdit();
    }
  }

  createFormControls() {
    this.firstName = new FormControl('', Validators.required);
    this.lastName = new FormControl('', Validators.required);
    this.dateOfBirth = new FormControl('', Validators.required);
    this.emailAddress = new FormControl('', [
      Validators.required,
      Validators.pattern("[^ @]*@[^ @]*"),
    ]);
    this.phoneNumber = new FormControl('', [
      Validators.required
    ]);
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

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action);
  }
}