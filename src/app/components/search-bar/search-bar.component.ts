import { Component, Output, Input, EventEmitter, ElementRef, HostListener, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SearchItemComponent, SearchResult } from '../search-item/search-Item.component';

@Component({
    selector: 'app-search-bar',
    imports: [
        ReactiveFormsModule,
        CommonModule,
        SearchItemComponent
    ],
    templateUrl: './search-bar.component.html',
    styleUrl: './search-bar.component.scss'
})
export class SearchBarComponent implements OnInit {
  @Input() data: SearchResult[] = [];
  @Output() result = new EventEmitter<SearchResult[]>();

  searchControl = new FormControl('');
  searchResults: SearchResult[] = [];
  showResults = false;

  constructor(private eRef: ElementRef) {}

  ngOnInit() {
    this.searchControl.valueChanges.subscribe((value) => {
      const term = this.normalize(value || '');

      // Se o campo estiver vazio, reseta e fecha
      if (!term) {
        this.resetSearch();
      }
    });
  }

  onSearch() {
    const term = this.normalize(this.searchControl.value || '');

    if (!term || term.length < 2) {
      this.resetSearch();
      return;
    }

    const results = this.data.filter(item =>
      this.normalize(item.title).includes(term)
    );

    this.searchResults = results;
    this.showResults = results.length > 0;
    this.result.emit(results);
  }

  private normalize(str: string) {
    return str
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // remove acentos
      .replace(/[^a-z0-9\s]/gi, '')    // remove caracteres especiais
      .trim()
      .replace(/\s+/g, ' ');
  }

  resetSearch() {
    this.searchResults = [];
    this.showResults = false;
    this.result.emit([]);
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
