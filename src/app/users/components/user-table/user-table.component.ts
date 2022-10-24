import { Component, Input } from '@angular/core';
import { UserModel } from './../../models/user-model';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.css']
})
export class UserTableComponent {

  constructor() { }
  @Input() users: UserModel[] = [];

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = this.users;
}

