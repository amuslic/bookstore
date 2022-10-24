import { FormControl, Validators } from '@angular/forms';

const validCharacters = /[^\s\w,.:&\/()+%'`@-]/;
const validPhone = /\d{10,}/;

export class CustomValidators extends Validators {

  static validateEmail(control: FormControl) {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;
    return regex.test(control.value) ? null : { email: true };
  }

  static validatePhone(control: FormControl) {

    return validPhone.test(control.value) ? null : { validPhone: true };
  }
  static validateCharacters(control: FormControl) {

    if (control.value && control.value.length > 0) {

      const matches = control.value.match(validCharacters);

      return matches && matches.length ? { invalid_characters: matches } : null;
    } else {
      return null;
    }
  }
}
