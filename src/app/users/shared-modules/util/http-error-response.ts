import { HttpErrorResponse } from '@angular/common/http';

export function getErrorMessage(response: HttpErrorResponse): string {
  if (response === undefined) {
    return '';
  } else if (response.error === undefined) {
    return response.message;
  } else if (response.error instanceof Object) {
    if (response.error.title !== undefined) {
      return response.error.title;
    }
    else if (response.error.errors !== undefined && response.error.errors.length > 0) {
      return Object.keys(response.error.errors).map((key) => {
        return `${key}: ${response.error.errors[key]}`;
      }).join('. ');
    }
  }
  return response.message;
}
