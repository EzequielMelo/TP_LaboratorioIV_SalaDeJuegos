import { Component, Input, AfterViewInit, inject } from '@angular/core';
import { RouterLink, Router, RouterOutlet } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { UserClass } from '../../classes/user-class';
import { initFlowbite } from 'flowbite';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.css'
})
export class CarouselComponent implements AfterViewInit {
  @Input() games: { name: string, image: string, url: string }[] = [];
  userName: string | null = null;

  private router = inject(Router);
  private authService = inject(AuthService);

  ngOnInit() {
    this.authService.userClass$.subscribe((userClass: UserClass | null) => {
      this.userName = userClass ? userClass.userName : null;
    });
  }

  ngAfterViewInit(): void {
    initFlowbite();
  }

  redirect(url: string) {
    if (this.userName !== null) {
      this.router.navigateByUrl(url);
    } else {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Debes estar logueado para jugar",
        showConfirmButton: false,
        timer: 1500
      });
    }
  }
}
