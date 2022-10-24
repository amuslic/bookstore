import { FormControl, FormGroup, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
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
  userForm!: FormGroup ;
  firstName!: FormControl;
  lastName!: FormControl;
  dateOfBirth!: FormControl;
  phoneNumber!: FormControl;
  email!: FormControl;

  constructor( 
    private userService: UserService) { 
    }

  ngOnInit(): void {
    this.users  = this.userService.getHeroes();
    this.createFormControls();
    this.createForm();
  }

  onSubmit(): void {
    // Process checkout data here
    return;
  }

  createFormControls() {
    this.firstName = new FormControl('', Validators.required);
    this.lastName = new FormControl('', Validators.required);
    this.email = new FormControl('', [
      Validators.required,
      Validators.pattern("[^ @]*@[^ @]*")

    ]);
  }

  createForm() {
    this.userForm = new FormGroup({
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
    });
  }

   onEdit(): void{
    this.isEditMode = !this.isEditMode
  }
}