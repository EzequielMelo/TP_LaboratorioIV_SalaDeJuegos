import { Component, Input, AfterViewInit } from '@angular/core';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.css'
})
export class CarouselComponent implements AfterViewInit {
  @Input() games: { name: string, image: string }[] = [];

  ngAfterViewInit(): void {
    initFlowbite();
  }
}
