import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { UserComponent } from './users/components/user/user.component';
import { UserTableComponent } from './users/components/user-table/user-table.component';
import { MatTableModule } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



@NgModule({
  declarations: [
    UserComponent,
    AppComponent,
    UserTableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap:[AppComponent]
})
export class AppModule { }
