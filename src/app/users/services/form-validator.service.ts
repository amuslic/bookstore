import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
    providedIn: 'root'
  })
export class FormService {

  public markFormGroupTouched(formGroup: FormGroup) {
   formGroup.markAsTouched();
  }

  public validationMessages() {
    const messages: any = {
      required: 'This field is required',
      email: 'This email address is invalid',
      invalid_characters: (matches: any[]) => {

        let matchedCharacters = matches;

        matchedCharacters = matchedCharacters.reduce((characterString, character, index) => {
          let string = characterString;
          string += character;

          if (matchedCharacters.length !== index + 1) {
            string += ', ';
          }

          return string;
        }, '');

        return `These characters are not allowed: ${matchedCharacters}`;
      },
    };

    return messages;
  }

  public validateForm(formToValidate: FormGroup, formErrors: any, checkDirty?: boolean) {
    const form = formToValidate;

    for (const field in formErrors) {
      if (field) {
        formErrors[field] = '';
        const control = form.get(field);

        const messages = this.validationMessages();
        if (control && !control.valid) {
          if (!checkDirty || (control.dirty || control.touched)) {
            for (const key in control.errors) {
              if (key && key !== 'invalid_characters') {
                formErrors[field] = formErrors[field] || messages[key];
              } else {
                formErrors[field] = formErrors[field] || messages[key](control.errors[key]);
              }
            }
          }
        }
      }
    }

    return formErrors;
  }
}