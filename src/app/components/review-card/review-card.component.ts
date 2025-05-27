import { Component, Input, OnInit } from '@angular/core';
import {  DatePipe, CommonModule } from '@angular/common';
import { StarRatingComponent } from '../star-rating/star-rating.component';

interface reviewCard{
  title: string,
  image: string,
  rating: number,
  username?:string,
  category?:string,
  reviewDate?: Date
}

@Component({
  selector: 'app-review-card',
  standalone: true,
  imports: [ DatePipe, StarRatingComponent, CommonModule],
  templateUrl: './review-card.component.html',
  styleUrl: './review-card.component.scss'
})
export class ReviewCardComponent implements OnInit {
  @Input() data: reviewCard[] = [];
  
  defaultImage: string = 'https://via.placeholder.com/150';
  
  ngOnInit(): void {
     this.data = this.data.map(item => ({
    ...item, rating: Math.max(0, Math.min(5, item.rating)) 
  }));
    // this.data = Math.max(0, Math.min(5, this.rating));
  }


}