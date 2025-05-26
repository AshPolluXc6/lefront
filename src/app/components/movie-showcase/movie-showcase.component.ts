import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy,  ChangeDetectorRef, NgZone } from '@angular/core';

interface Movie {
  title: string;
  image: string;
  rating: string;
  duration: string;
  category: string;
}

@Component({
  selector: 'app-movie-showcase',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './movie-showcase.component.html',
  styleUrl: './movie-showcase.component.scss'
})
export class MovieShowcaseComponent implements OnInit, OnDestroy {
  constructor(
      private cdRef: ChangeDetectorRef,
      private ngZone: NgZone
    ) {}
 movies: Movie[] = [
    {
      title: 'Inception',
      image: 'https://images.pexels.com/photos/3062541/pexels-photo-3062541.jpeg',
      rating: '12',
      duration: '148 min',
      category: 'Sci-Fi'
    },
    {
      title: 'The Dark Knight',
      image: 'https://images.pexels.com/photos/2873486/pexels-photo-2873486.jpeg',
      rating: '14',
      duration: '152 min',
      category: 'Action'
    },
    {
      title: 'La La Land',
      image: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg',
      rating: 'L',
      duration: '128 min',
      category: 'Musical'
    },
    {
      title: 'Parasite',
      image: 'https://images.pexels.com/photos/2507025/pexels-photo-2507025.jpeg',
      rating: '16',
      duration: '132 min',
      category: 'Drama'
    }
  ];

  activeIndex = 0;
  private intervalId: any;
  private isAuto = true;

  ngOnInit() {
    this.ngZone.runOutsideAngular(() => {
      setTimeout(() => {
        this.ngZone.run(() => {
          this.startAutoRotation();
          this.cdRef.detectChanges();
        });
      }, 300);
    });
  }

  startAutoRotation() {
    if (this.intervalId) clearInterval(this.intervalId);
    
    this.intervalId = this.ngZone.runOutsideAngular(() => {
      return setInterval(() => {
        this.ngZone.run(() => {
          if (this.isAuto) {
            this.activeIndex = (this.activeIndex + 1) % this.movies.length;
            this.cdRef.markForCheck();
          }
        });
      }, 6000);
    });
  }

  onMouseEnter(index: number) {
    this.isAuto = false;
    clearInterval(this.intervalId);
    this.activeIndex = index;
  }

  onMouseLeave() {
    this.isAuto = true;
    this.startAutoRotation();
  }

  onTouch(index: number) {
    this.isAuto = false;
    clearInterval(this.intervalId);
    this.activeIndex = index;
  }

  ngOnDestroy() {
    clearInterval(this.intervalId);
  }
}
