import { Component, Output,Input, EventEmitter, HostListener, ElementRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SearchItemComponent } from '../search-item/search-item.component';
import { SearchResult } from '../search-item/search-item.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [
    FormsModule,
    SearchItemComponent,
    CommonModule
  ],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss'
})
export class SearchBarComponent {
  @Output() search = new EventEmitter<string>();
  @Input() searchResults: SearchResult[] = [];
  searchTerm: string = '';
  showResults: boolean = false;

 constructor(private eRef: ElementRef) {}

  onSearch(): void {
    this.search.emit(this.searchTerm);
      this.showResults = true;
  }

  
  closeResults() {
    this.showResults = false;
  }

   @HostListener('document:click', ['$event'])
  clickout(event: MouseEvent) {
    if (!this.eRef.nativeElement.contains(event.target)) {
      this.closeResults();
    }
  }
}