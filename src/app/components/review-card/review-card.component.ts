import { Component, Input, OnInit } from '@angular/core';
import { NgStyle, NgClass, DatePipe } from '@angular/common';
import { StarRatingComponent } from '../star-rating/star-rating.component';

@Component({
  selector: 'app-review-card',
  standalone: true,
  imports: [NgStyle, NgClass, DatePipe, StarRatingComponent],
  templateUrl: './review-card.component.html',
  styleUrl: './review-card.component.scss'
})
export class ReviewCardComponent implements OnInit {
  @Input() imageUrl: string = '';
  @Input() title: string = '';
  @Input() rating: number = 0;
  @Input() username: string = '';
  @Input() reviewDate: Date = new Date();
  
  // Default image if none provided
  defaultImage: string = 'https://via.placeholder.com/150';
  
  ngOnInit(): void {
    // Ensure rating is within bounds (0-5)
    this.rating = Math.max(0, Math.min(5, this.rating));
  }

  // Get image source with fallback
  get imageSrc(): string {
    return this.imageUrl || this.defaultImage;
  }
}