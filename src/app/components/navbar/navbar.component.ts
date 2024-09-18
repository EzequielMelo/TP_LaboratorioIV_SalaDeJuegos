import { Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Auth } from '@angular/fire/auth';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterOutlet],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})

export class NavbarComponent {
  isLogged: boolean = false;

  private auth = inject(Auth);
  //private router = inject(Router);

  ngOnInit() {
    this.auth.onAuthStateChanged((auth) => {
      if (auth?.email) {
        this.isLogged = true;
      }
    })
  }

  logOut() {
    this.auth.signOut().then(() => {
      this.isLogged = false;
      console.log("deslogueado")
    }).catch((error) => {
      console.log(error)
    })
  }

}
