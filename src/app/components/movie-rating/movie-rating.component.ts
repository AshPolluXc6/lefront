import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-movie-rating',
  imports: [CommonModule],
  templateUrl: './movie-rating.component.html',
  styleUrl: './movie-rating.component.scss'
})
export class MovieRatingComponent {
  @Input() overallScore: number | null = null;
  @Input() ratingCriteria : { name: string; score: number }[] = [];
  
  ngOnInit() {
   if ((this.overallScore === null || this.overallScore === undefined) && this.ratingCriteria.length > 0) {
      this.overallScore = this.calcOverAllScore();
    }
  }

  calcOverAllScore(): number {
    const totalScore = this.ratingCriteria.reduce((sum, item) => sum + item.score, 0);
    const avgScore = totalScore / this.ratingCriteria.length;
    return avgScore;
  }

  get filledStarCount(): number {
    const score = this.overallScore ?? 0;
    return score / 2;
  }
  
  getStars() {
    return new Array(5);
  }
}
