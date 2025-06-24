import { Component, Input } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs';
import { AbasService, Aba } from '../../core/services/sessionStorage.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PoAvatarModule, PoIconModule } from '@po-ui/ng-components';
import { poModules } from '../../po.imports';

@Component({
  selector: 'app-navtabs',
  standalone: true,
  imports: [
    CommonModule,
    PoAvatarModule,
    PoIconModule,
    ...poModules
  ],
  templateUrl: './navtabs.component.html',
  styleUrl: './navtabs.component.scss'
})
export class NavtabsComponent {
  @Input() novaAbaLabel: string = '+ Nova Aba';
  @Input() labelNaoFechavel: string = ''; // opcional: para proteger abas com este label
  @Input() maximoAbas: number = 21;
  @Input() viewInRout: string[] = [];

  rotaBase: string = '';
  rotaVisivel = false;
  abasAbertas: Aba[] = [];

  constructor(private router: Router, private abasService: AbasService, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        const url = event.urlAfterRedirects || event.url;
        this.rotaBase = this.getBaseRota(url);
        this.rotaVisivel = this.viewInRout.some(r => this.rotaBase.includes(r));
        
        if (this.rotaVisivel) {
          this.abrirAbaAtual();
        }
      });

    this.abasService.getAbas().subscribe(abas => {
      this.abasAbertas = abas;
    });
  }

  navegarParaAba(aba: Aba, event?: Event): void {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    
    // Evitar navegação se já está na mesma aba
    if (this.router.url === aba.link) return;
    
    // Forçar recriação do componente se for a aba principal
    if (aba.fixo) {
      this.router.navigateByUrl('/blank', { skipLocationChange: true }).then(() => {
        this.router.navigateByUrl(aba.link);
      });
    } else {
      this.router.navigateByUrl(aba.link);
    }
  }

  // Mantém abas fixas + abas do módulo atual
  get abasFiltradas() {
    return this.abasAbertas.filter(aba => 
      aba.fixo || // Mantém todas as abas fixas
      aba.link?.startsWith(`${this.rotaBase}`) // + abas do módulo atual
    );
  }

  rotaEstaAtiva(link: string): boolean {
    // Verifica se a rota começa com o link da aba
    return this.router.url.startsWith(link);
  }

  fecharAba(id: string, event: Event): void {
    event.stopPropagation();
    this.abasService.fecharAba(id);
  }

  abrirAbaAtual() {
    const rotaAtual = this.router.url;
    const partes = rotaAtual.split('/').filter(p => p);
    const basePath = `/${partes.slice(0, 2).join('/')}`;
    const id = partes.length >= 3 ? partes[2] : null;

    this.abasService.abrirAba({
      basePath,
      id,
      label: this.formatarLabel(id),
      navegar: false
    });
  }

  abrirModalAbas() {
    this.abasService.abrirModalAbas?.();
  }

  private getBaseRota(url: string): string {
    const partes = url.split('/').filter(p => p);
    return `/${partes.slice(0, 2).join('/')}`;
  }

  formatarLabel(id: string | null): string {
    if (!id) return 'Principal';
    if (id === 'novo') return 'Novo';
    return `#${id}`;
  }
}