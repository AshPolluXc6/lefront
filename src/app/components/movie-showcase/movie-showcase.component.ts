import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy,  ChangeDetectorRef, NgZone, Input } from '@angular/core';

interface Movie {
  title: string;
  image: string;
  rating: string;
  duration: string;
  category: string;
}

@Component({
    selector: 'app-movie-showcase',
    imports: [CommonModule],
    templateUrl: './movie-showcase.component.html',
    styleUrl: './movie-showcase.component.scss'
})
export class MovieShowcaseComponent implements OnInit, OnDestroy {

   @Input() movies: Movie[] = [];

  constructor(
      private cdRef: ChangeDetectorRef,
      private ngZone: NgZone
  ) {}

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
