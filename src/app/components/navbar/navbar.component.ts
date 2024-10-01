import { AuthService } from './../../services/auth/auth.service';
import { Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AvvvatarsComponent } from '@ngxpert/avvvatars';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [AvvvatarsComponent, RouterLink, RouterOutlet],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})

export class NavbarComponent {
  user: any = null;
  userName: any = null;
  protected authService = inject(AuthService);

  ngOnInit() {
    this.authService.authUser$.subscribe(user => {
      this.user = user;
    });
    this.authService.userClass$.subscribe(user => {
      this.userName = user?.userName;
    });
  };

  ngAfterViewInit(): void {
    initFlowbite();
  }

  logOut() {
    this.authService.logOut();
  };
}
