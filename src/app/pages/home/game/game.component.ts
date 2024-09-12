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
  @Input() juego: any;
  @Input() index!: number;

  ngAfterViewInit(): void {
    const atroposId = `atropos-${this.index}`;

    const myAtropos = Atropos({
      el: `#${atroposId}`,
      activeOffset: 80,
      shadowScale: 1.10,
      shadow: true
    });
  }
}
