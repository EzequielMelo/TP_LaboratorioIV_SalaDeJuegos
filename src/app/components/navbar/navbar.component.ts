import { AuthService } from './../../services/auth/auth.service';
import { Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterOutlet],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})

export class NavbarComponent {
  user: any = null;
  protected authService = inject(AuthService)

  ngOnInit() {
    this.authService.user$.subscribe(user => {
      this.user = user;
    });
  }

  logOut() {
    this.authService.logOut();
  }
}
