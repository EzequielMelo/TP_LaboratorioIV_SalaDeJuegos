import { Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink, RouterOutlet],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {
  email = "";
  password = "";

  private auth = inject(Auth);
  private router = inject(Router);

  login() {
    signInWithEmailAndPassword(this.auth, this.email, this.password)
  }

  ngOnInit() {
    this.auth.onAuthStateChanged((auth) => {
      if (auth?.email) {
        this.router.navigateByUrl('');
      }
    })
  }
}
