import { Injectable } from '@angular/core';
import { FirebaseError } from '@angular/fire/app';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlerService {
  constructor() {}

  handleAuthError(error: any): string {
    // Si el error tiene un mensaje personalizado, lo retornamos tal cual
    if (error?.message === 'El nombre de usuario ya está en uso.') {
      return error.message;
    }

    // Caso: errores de Firebase
    if (error instanceof FirebaseError) {
      switch (error.code) {
        case 'auth/email-already-in-use':
          return 'El correo ya está en uso. Por favor, utiliza otro.';
        case 'auth/invalid-email':
          return 'El correo ingresado no es válido.';
        case 'auth/invalid-credential':
          return 'No se encontró el usuario. Verifica tus datos.';
        case 'auth/wrong-password':
          return 'La contraseña es incorrecta.';
        case 'auth/weak-password':
          return 'La contraseña debe tener al menos 6 caracteres.';
        default:
          return 'Ocurrió un error inesperado. Intenta nuevamente.';
      }
    }

    // Si no es un error de Firebase ni un error personalizado
    return 'Ocurrió un error inesperado. Intenta nuevamente.';
  }
}
