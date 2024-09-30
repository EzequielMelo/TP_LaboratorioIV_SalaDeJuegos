import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormValidationService {

  constructor() { }

  validateEmail(control: AbstractControl): ValidationErrors | null {
    const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
    if (!emailPattern.test(control.value)) {
      return { invalidEmail: 'El formato de email es incorrecto' };
    }
    return null;
  }

  validatePassword(control: AbstractControl): ValidationErrors | null {
    if (control.value.length < 6) {
      return { weakPassword: 'La contraseña debe tener al menos 6 caracteres' };
    }
    return null;
  }

  validateUsername(control: AbstractControl): ValidationErrors | null {
    if (control.value.length < 4) {
      return { invalidUsername: 'El nombre de usuario debe tener al menos 4 caracteres' };
    }
    return null;
  }
}
