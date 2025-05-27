import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

interface newsCard {
  title: string,
  image: string,
  category: string | 'Não Tem',
  date: Date,
  readTime: string | 'não tem',
  description: string
}

@Component({
  selector: 'app-news-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './news-card.component.html',
  styleUrl: './news-card.component.scss'
})
export class NewsCardComponent {
  @Input() data: newsCard[] = [];

}
