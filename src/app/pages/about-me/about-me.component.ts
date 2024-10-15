import { Component, inject } from '@angular/core';
import { ApiRequestService } from '../../services/api-request/api-request.service';

@Component({
  selector: 'app-about-me',
  standalone: true,
  imports: [],
  templateUrl: './about-me.component.html',
  styleUrl: './about-me.component.css'
})

export class AboutMeComponent {
  receivedData: any = {};

  apiRequest = inject(ApiRequestService);

  ngOnInit() {
    const request = this.apiRequest.getUser('EzequielMelo');

    request.subscribe((response) => {
      this.receivedData = response;
      console.log(this.receivedData)
    })
  }

}
