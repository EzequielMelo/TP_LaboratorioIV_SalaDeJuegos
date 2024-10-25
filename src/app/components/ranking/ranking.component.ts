import { Component, Input } from '@angular/core';
import { RankingClass } from '../../classes/ranking-class';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ranking',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './ranking.component.html',
  styleUrl: './ranking.component.css',
})
export class RankingComponent {
  @Input() ranking: RankingClass[] | null = null;
}
