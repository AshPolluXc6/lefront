import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AdvertisementComponent } from '../../components/advertisement/advertisement.component';
import { MovieRatingComponent } from '../../components/movie-rating/movie-rating.component';
import { ArticleHeaderComponent } from '../../components/article-header/article-header.component';

@Component({
  selector: 'app-article',
  imports: [CommonModule,AdvertisementComponent,MovieRatingComponent,ArticleHeaderComponent],
  templateUrl: './article.component.html',
  styleUrl: './article.component.scss'
})
export class ArticleComponent {

}
