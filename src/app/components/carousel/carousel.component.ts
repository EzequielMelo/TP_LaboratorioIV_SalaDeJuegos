import { Component, Input, AfterViewInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.css'
})
export class CarouselComponent implements AfterViewInit {
  @Input() games: { name: string, image: string, url: string }[] = [];

  ngAfterViewInit(): void {
    initFlowbite();
  }
}
