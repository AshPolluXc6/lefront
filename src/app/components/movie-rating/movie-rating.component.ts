import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-movie-rating',
  imports: [CommonModule],
  templateUrl: './movie-rating.component.html',
  styleUrl: './movie-rating.component.scss'
})
export class MovieRatingComponent {
  @Input() overallScore: number = 8.5;
  @Input() ratingCriteria = [
    { name: 'Roteiro', score: 9 },
    { name: 'Direção', score: 8 },
    { name: 'Atuação', score: 8.5 },
    { name: 'Cinematografia', score: 9.5 },
    { name: 'Trilha Sonora', score: 7.5 }
  ];

  get filledStarCount(): number {
    return Math.floor(this.overallScore / 2);
  }

  getStars() {
    return new Array(5);
  }
}
