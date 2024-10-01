import { AfterViewInit, Component, inject, Input } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import Atropos from 'atropos';
import 'atropos/css'

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './game.component.html',
  styleUrl: './game.component.css'
})
export class GameComponent implements AfterViewInit {
  @Input() game: any;
  @Input() index!: number;

  private router = inject(Router);

  ngAfterViewInit(): void {
    const atroposId = `atropos-${this.index}`;

    const myAtropos = Atropos({
      el: `#${atroposId}`,
      activeOffset: 20,
      shadowScale: 1.05,
      shadow: true
    });
  }

  redirect(url: string) {
    this.router.navigateByUrl(url);
  }
}
