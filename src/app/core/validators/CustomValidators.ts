import { AbstractControl, ValidationErrors } from "@angular/forms";

export class CustomValidators {
  static passwordMatch(matchTo: string): (control: AbstractControl) => ValidationErrors | null {
    return (control: AbstractControl): ValidationErrors | null => {
      return passwordMatchValidator(control, matchTo);
    }
  }

  static byteMatch(value: number): (control: AbstractControl) => ValidationErrors | null {
    return (control: AbstractControl): ValidationErrors | null => {
      return byteMatchValidator(control, value);
    }
  }

  static noWhitespace(): (control: AbstractControl) => ValidationErrors | null {
    return (control: AbstractControl): ValidationErrors | null => {
      return noWhitespaceValidator(control);
    }
  }

  static passwordStrong(): (control: AbstractControl) => ValidationErrors | null {
    return (control: AbstractControl): ValidationErrors | null => {
      return passwordStrongValidator(control);
    }
  }
}

export function passwordMatchValidator(control: AbstractControl, matchTo: string): ValidationErrors | null {
  return control.parent && control.parent.value && control.value === control.parent.controls[matchTo].value
    ? null
    : { 'passwordMatch': true };
}

export function byteMatchValidator(control: AbstractControl, value: number): ValidationErrors | null {
  return control.parent && control.parent.value && (new TextEncoder().encode(control.value)).length <= value ? null : { 'byteMatch': true };
}

export function noWhitespaceValidator(control: AbstractControl): ValidationErrors | null {
  const isWhitespace = (control.value || '').trim().length === 0;
  const isValid = !isWhitespace;
  return isValid ? null : { 'whitespace': true };
}

export function passwordStrongValidator(control: AbstractControl): ValidationErrors | null {
  let hasNumber = /\d/.test(control.value);
  let hasUpper = /[A-Z]/.test(control.value);
  let hasLower = /[a-z]/.test(control.value);
  console.log('Num, Upp, Low', hasNumber, hasUpper, hasLower);
  const valid = hasNumber && hasUpper && hasLower;
  if (!valid) {
    // return what´s not valid
    return { passwordStrong: true };
  }
  return null;
}

