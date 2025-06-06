import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-advertisement',
  imports: [CommonModule],
  templateUrl: './advertisement.component.html',
  styleUrl: './advertisement.component.scss'
})
export class AdvertisementComponent {
  @Input() adClass: string = 'banner';
  @Input() label: string = 'Publicidade';
  @Input() title: string = 'Streaming Premium';
  @Input() description: string = 'Assista aos melhores filmes e séries em 4K. Teste grátis por 30 dias.';
  @Input() buttonText: string = 'Saiba Mais';
  @Input() showButton: boolean = true;
}
