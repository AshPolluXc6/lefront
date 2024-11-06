import { Component } from '@angular/core';
import { RateStarsComponent } from '../../../../projects/clib/src/lib';
import { NewsComponent } from '../../../../projects/clib/src/lib/news/news.component';



@Component({
  selector: 'app-client-home',
  standalone: true,
  imports: [RateStarsComponent, NewsComponent],
  templateUrl: './client-home.component.html',
  styleUrl: './client-home.component.scss'
})
export class ClientHomeComponent {

}
