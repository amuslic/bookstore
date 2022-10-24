import { Component, Input, OnInit } from '@angular/core';
import { UserModel } from './../../models/user-model';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.css']
})
export class UserTableComponent implements OnInit {

  @Input() users: UserModel[] = [];
  displayedColumns: string[] = [];

  ngOnInit(): void {
    this.displayedColumns = ['firstName', 'lastName', 'dateOfBirth', 'emailAddress', 'phoneNumber'];
  }
}