import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AdvertisementComponent } from '../../components/advertisement/advertisement.component';
import { MovieRatingComponent } from '../../components/movie-rating/movie-rating.component';
import { ArticleHeaderComponent } from '../../components/article-header/article-header.component';

@Component({
  selector: 'app-article-read',
  imports: [CommonModule, AdvertisementComponent,MovieRatingComponent,ArticleHeaderComponent],
  templateUrl: './article-read.component.html',
  styleUrl: './article-read.component.scss'
})
export class ArticleReadComponent {

}
