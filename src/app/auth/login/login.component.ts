import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators, AbstractControl } from '@angular/forms';
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

  private authService = inject(AuthService)
  private formBuilder = inject(FormBuilder)
  private validationService = inject(FormValidationService)
  private router = inject(Router);

  ngOnInit() {
    this.authService.authUser$.subscribe((respuesta) => {
      if (respuesta != null) {
        this.router.navigateByUrl('');
      }
    });
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, (control: AbstractControl) => this.validationService.validateEmail(control)]],
      password: ['', [Validators.required, (control: AbstractControl) => this.validationService.validatePassword(control)]]
    });
  }

  login() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.authService.login(email, password).subscribe({
        next: () => {
          this.router.navigateByUrl('');
        },
        error: (errorMessage: string) => {
          this.errorMessage = errorMessage;
        }
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
