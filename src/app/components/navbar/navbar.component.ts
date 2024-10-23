import { AuthService } from './../../services/auth/auth.service';
import { Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AvvvatarsComponent } from '@ngxpert/avvvatars';
import { initFlowbite } from 'flowbite';
import { UserClass } from '../../classes/user-class';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [AvvvatarsComponent, RouterLink, RouterOutlet],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  userName: any = null;
  auth: boolean = false;
  protected authService = inject(AuthService);

  constructor() {
    this.authService.authUser$.subscribe((response) => {
      if (response) {
        this.auth = true;
      } else {
        this.auth = false;
      }
    });
    this.authService.user$.subscribe((userClass: UserClass | null) => {
      this.userName = userClass ? userClass.userName : null;
    });
  }

  ngAfterViewInit(): void {
    initFlowbite();
  }

  logOut() {
    this.authService.logOut();
  }
}
