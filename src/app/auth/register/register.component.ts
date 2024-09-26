import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators, AbstractControl } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { FormValidationService } from '../../services/form-validation/form-validation.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, RouterLink, RouterOutlet, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})

export class RegisterComponent {
  registerForm!: FormGroup;
  errorMessage = "";

  private router = inject(Router);
  private authService = inject(AuthService)
  private formBuilder = inject(FormBuilder)
  private validationService = inject(FormValidationService)

  ngOnInit() {
    this.authService.user$.subscribe((respuesta) => {
      if (respuesta != null) {
        this.router.navigateByUrl('');
      }
    });
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, (control: AbstractControl) => this.validationService.validateEmail(control)]],
      password: ['', [Validators.required, (control: AbstractControl) => this.validationService.validatePassword(control)]]
    });
  }

  register() {
    if (this.registerForm.valid) {
      const { email, password } = this.registerForm.value;
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
}
