import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { ErrorHandlerService } from '../../services/error-handler/error-handler.service';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, RouterLink, RouterOutlet],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})

export class RegisterComponent {
  email = "";
  password = "";
  errorMessage = "";

  private auth = inject(Auth);
  private router = inject(Router);
  private errorHandler = inject(ErrorHandlerService);
  private authService = inject(AuthService)

  ngOnInit() {
    this.authService.redirectIfAuthenticated();
  }

  register() {
    createUserWithEmailAndPassword(this.auth, this.email, this.password)
      .then(() => {
        this.router.navigateByUrl('');
      })
      .catch((error) => {
        this.errorMessage = this.errorHandler.handleAuthError(error)
      });
  }
}
