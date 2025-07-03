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
  @Input() title: string = 'Anuncie Seu Negócio Aqui';
  @Input() description: string = 'Todos os direitos do espaço em destaque reservados ao anunciante';
  @Input() buttonText: string = 'Saiba Mais';
  @Input() showButton: boolean = true;
}
