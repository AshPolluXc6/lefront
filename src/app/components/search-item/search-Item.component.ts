import { Component, Input } from '@angular/core';

export interface SearchResult {
  id: string;
  title: string;
  thumbnail: string;
  date: string;
  category: string;
  relevanceScore: number;
}

@Component({
  selector: 'app-search-item',
  standalone: true,
  imports: [],
  templateUrl: './search-item.component.html',
  styleUrl: './search-item.component.scss'
})
export class SearchItemComponent {
@Input() result!: SearchResult;



  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString();
  }
}
