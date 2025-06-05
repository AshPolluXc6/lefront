import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { NgStyle, NgFor } from '@angular/common';

@Component({
    selector: 'app-star-rating',
    imports: [NgStyle, NgFor],
    templateUrl: './star-rating.component.html',
    styleUrl: './star-rating.component.scss'
})
export class StarRatingComponent implements OnChanges {
  @Input() rating: number = 0;
  @Input() maxStars: number = 5;
  
  stars: { filled: number }[] = [];
  
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['rating'] || changes['maxStars']) {
      this.calculateStars();
    }
  }
  
  private calculateStars(): void {
    this.stars = [];
    
    for (let i = 0; i < this.maxStars; i++) {
      const difference = this.rating - i;
      
      let filled = 0;
      if (difference >= 1) {
        filled = 1; // Full star
      } else if (difference > 0) {
        filled = difference; // Partial star
      }
      
      this.stars.push({ filled });
    }
  }
}