import { Component, Input, OnInit,Output, OnDestroy, ChangeDetectorRef, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface SlideImage {
  src: string;
  alt?: string;
}

@Component({
  selector: 'app-slider',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.scss',
})
export class SliderComponent implements OnInit, OnDestroy {
  @Input() images: SlideImage[] = [];
  @Output() mouseEnter = new EventEmitter<void>();
  @Output() mouseLeave = new EventEmitter<void>();
  

  currentIndex = 0;
  intervalId: any;
  
  ngOnInit(): void {
     setTimeout(() => {
      this.startAutoSlide();
      this.cdRef.detectChanges();
    }, 300);
  }
  
    ngOnDestroy(): void {
    this.stopAutoSlide();
  }
    constructor(private cdRef: ChangeDetectorRef) {}

   startAutoSlide(): void {
      this.intervalId = window.setInterval(() => {
      this.nextSlide();
      this.cdRef.markForCheck();
    }, 4000);
  }

    stopAutoSlide(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  prevSlide(): void {
    this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
     this.cdRef.detectChanges();
  }

  nextSlide(): void {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
    this.cdRef.detectChanges(); 
  }


  goToSlide(index: number): void {
    this.currentIndex = index;
    this.cdRef.detectChanges();
  }

  isActive(index: number): boolean {
    return this.currentIndex === index;
  }
}
