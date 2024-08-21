import { Component, input } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'lib-banner',
  standalone: true,
  imports: [NgClass],
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.css'
})
export class BannerComponent {

}
