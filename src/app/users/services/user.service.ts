import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { catchError, map, Observable, of } from 'rxjs';
import { UserModel } from '../models/user-model';
import { NonEmptyResponse } from '../shared-modules/models/none-empty.response';
import { AppSettingsService } from '../shared-modules/services/app-settings/app-settings.service';
import { getErrorMessage } from '../shared-modules/util/http-error-response';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient,
    private settings: AppSettingsService) { }

  getHeroes(): UserModel[] {
    var sampleData: UserModel[] = [
      { firstName: "John", lastName: "Wick", dateOfBirth: "2022-09-09", phoneNumber: "12345", emailAddress:"example@gmail.com" },
      { firstName: "Kate", lastName: "Winslet", dateOfBirth: "2022-09-09", phoneNumber: "12345", emailAddress:"example@gmail.com" },
      { firstName: "Brad", lastName: "Pitt", dateOfBirth: "2022-09-09", phoneNumber: "12345", emailAddress:"example@gmail.com" },
    ];
    return sampleData;
  }

   createUser(request: FormGroup): Observable<NonEmptyResponse<any>> {

    //make conversion from form group to request model
    const endpointUrl = this.settings.keys.user.createUser;

    return this.http
      .post(endpointUrl, request)
      .pipe(
        map(response => new NonEmptyResponse<object>(true, '', response)),
        catchError(errorResponse => {
          const errorMessage = getErrorMessage(errorResponse);
          return of(new NonEmptyResponse<object>(false, errorMessage, undefined));
        })
      );
  }
}
