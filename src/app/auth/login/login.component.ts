import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators, AbstractControl } from '@angular/forms';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { ErrorHandlerService } from '../../services/error-handler/error-handler.service';
import { AuthService } from '../../services/auth/auth.service';
import { FormValidationService } from '../../services/form-validation/form-validation.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink, RouterOutlet, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  errorMessage = "";

  private auth = inject(Auth);
  private router = inject(Router);
  private errorHandler = inject(ErrorHandlerService);
  private authService = inject(AuthService)
  private formBuilder = inject(FormBuilder)
  private validationService = inject(FormValidationService)

  ngOnInit() {
    this.authService.redirectIfAuthenticated();
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, (control: AbstractControl) => this.validationService.validateEmail(control)]],
      password: ['', [Validators.required, (control: AbstractControl) => this.validationService.validatePassword(control)]]
    });
  }


  login() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      signInWithEmailAndPassword(this.auth, email, password)
        .then(() => {
          this.router.navigateByUrl('');
        })
        .catch((error) => {
          this.errorMessage = this.errorHandler.handleAuthError(error);
        });
    }
  }

  usuarioPrueba() {
    this.loginForm.patchValue({
      email: 'usuario@ejemplo.com',
      password: '123456'
    });
  }
}
