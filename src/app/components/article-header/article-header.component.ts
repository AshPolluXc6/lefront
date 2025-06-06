import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-article-header',
  imports: [],
  templateUrl: './article-header.component.html',
  styleUrl: './article-header.component.scss'
})
export class ArticleHeaderComponent {
  @Input() category: string = 'Crítica de Cinema';
  @Input() title: string = 'A Revolução do Cinema Moderno: Como os Novos Diretores Estão Redefinindo a Narrativa';
  @Input() subtitle: string = 'Uma análise profunda sobre as tendências cinematográficas que estão moldando o futuro da sétima arte';
  @Input() authorName: string = 'Maria Silva';
  @Input() authorTitle: string = 'Crítica de Cinema';
  @Input() authorAvatar: string = 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=96&h=96&dpr=2';
  @Input() publishDate: string = '15 de Janeiro, 2025';
  @Input() readTime: number = 8;
}
