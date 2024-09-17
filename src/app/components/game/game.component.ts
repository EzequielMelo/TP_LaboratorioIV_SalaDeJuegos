import { AfterViewInit, Component, Input } from '@angular/core';
import Atropos from 'atropos';
import 'atropos/css'

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [],
  templateUrl: './game.component.html',
  styleUrl: './game.component.css'
})
export class GameComponent implements AfterViewInit {
  @Input() game: any;
  @Input() index!: number;

  ngAfterViewInit(): void {
    const atroposId = `atropos-${this.index}`;

    const myAtropos = Atropos({
      el: `#${atroposId}`,
      activeOffset: 20,
      shadowScale: 1.05,
      shadow: true
    });
  }
}
