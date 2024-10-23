import { AfterViewInit, Component, inject, Input } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { UserClass } from '../../classes/user-class';
import Swal from 'sweetalert2';
import Atropos from 'atropos';
import 'atropos/css';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './game.component.html',
  styleUrl: './game.component.css',
})
export class GameComponent implements AfterViewInit {
  @Input() game: any;
  @Input() index!: number;
  auth: boolean = false;

  private router = inject(Router);
  private authService = inject(AuthService);

  ngOnInit() {
    this.authService.authUser$.subscribe((response) => {
      if (response !== null) {
        this.auth = true;
      } else {
        this.auth = false;
      }
    });
  }

  ngAfterViewInit(): void {
    const atroposId = `atropos-${this.index}`;

    const myAtropos = Atropos({
      el: `#${atroposId}`,
      activeOffset: 20,
      shadowScale: 1.05,
      shadow: true,
    });
  }

  redirect(url: string) {
    if (this.auth !== false) {
      this.router.navigateByUrl(url);
    } else {
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Debes estar logueado para jugar',
        showConfirmButton: false,
        timer: 1500,
      });
    }
  }
}
