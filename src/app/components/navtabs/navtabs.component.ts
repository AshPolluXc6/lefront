// navtabs.component.ts
import { Component, Input, OnDestroy, ChangeDetectorRef, OnInit  } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter, takeUntil, distinctUntilChanged, debounceTime } from 'rxjs/operators';
import { Subject, combineLatest } from 'rxjs';
import { AbasService, Aba } from '../../core/services/sessionStorage.service';
import { CommonModule } from '@angular/common';
import { PoIconModule } from '@po-ui/ng-components';

@Component({
  selector: 'app-navtabs',
  standalone: true,
  imports: [CommonModule, PoIconModule],
  templateUrl: './navtabs.component.html',
  styleUrls: ['./navtabs.component.scss']
})
export class NavtabsComponent implements OnInit, OnDestroy {
  @Input() novaAbaLabel: string = '+';
  @Input() maximoAbas: number = 21;
  
  @Input() set grupoRotas(value: string[]) {
    this._grupoRotas = value;
    this.atualizarAbasVisiveis();
  }
  get grupoRotas(): string[] {
    return this._grupoRotas;
  }
  private _grupoRotas: string[] = [];
  
  abasVisiveis: Aba[] = [];
  mostrarComponente = false;
  
  private destroy$ = new Subject<void>();

  constructor(
    private router: Router, 
    private abasService: AbasService,
    private cdr: ChangeDetectorRef
  ) {
    // Combina eventos de roteamento e atualizações de abas
    combineLatest([
      this.router.events.pipe(
        filter(event => event instanceof NavigationEnd),
        distinctUntilChanged()
      ),
      this.abasService.getAbas().pipe(
        distinctUntilChanged()
      )
    ]).pipe(
      takeUntil(this.destroy$),
      debounceTime(0) // Evita múltiplas execuções no mesmo ciclo
    ).subscribe(() => {
      this.atualizarAbasVisiveis();
    });
  }
  ngOnInit():void{
       this.atualizarAbasVisiveis();
    
    // Observar mudanças de rota
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      takeUntil(this.destroy$)
    ).subscribe(() => {
      this.atualizarAbasVisiveis();
    });

    // Observar mudanças nas abas
    this.abasService.getAbas().pipe(
      takeUntil(this.destroy$)
    ).subscribe(() => {
      this.atualizarAbasVisiveis();
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private atualizarAbasVisiveis(): void {
    const urlAtual = this.router.url;
    
    // Verifica se a rota atual pertence ao grupo
    // const pertenceAoGrupo = this.grupoRotas.some(rota => 
    //   urlAtual.startsWith(rota)
    // );

    if (!this.grupoRotas.some(rota => urlAtual.startsWith(rota))) {
      this.abasVisiveis = [];
      this.mostrarComponente = false;
      return;
    }
    
    // if (!pertenceAoGrupo) {
    //   this.abasVisiveis = [];
    //   this.mostrarComponente = false;
    //   this.cdr.markForCheck();
    //   return;
    // }

    this.mostrarComponente = true;
    
    // Filtra abas que pertencem a qualquer rota do grupo
    // const todasAbas = this.abasService.getAbasSync();
    // this.abasVisiveis = todasAbas.filter(aba => 
    //   this.grupoRotas.some(rota => aba.link.startsWith(rota))
    // );
     this.abasVisiveis = this.abasService.getAbasSync().filter(aba => 
      this.grupoRotas.some(rota => aba.link.startsWith(rota))
    );
    
    this.cdr.markForCheck();
  }

  navegarParaAba(aba: Aba, event?: Event): void {
    event?.preventDefault();
    event?.stopPropagation();
    
    if (this.router.url === aba.link) return;
    
    if (aba.fixo) {
      this.router.navigateByUrl('/blank', { skipLocationChange: true }).then(() => {
        this.router.navigateByUrl(aba.link);
      });
    } else {
      this.router.navigateByUrl(aba.link);
    }
  }

  rotaEstaAtiva(link: string): boolean {
    return this.router.url.startsWith(link);
  }

  fecharAba(id: string, event: Event): void {
    event.stopPropagation();
    this.abasService.fecharAba(id);
  }

  abrirAbaAtual() {
    const rotaAtual = this.router.url;
    const partes = rotaAtual.split('/').filter(p => p);
    
    if (partes.length < 2) return;
    
    const basePath = `/${partes[0]}/${partes[1]}`;
    const id = partes.length >= 3 ? partes[2] : 'novo-' + Date.now();

    this.abasService.abrirAba({
      basePath,
      id,
      label: 'Nova Aba',
      navegar: false
    });
  }

  abrirModalAbas() {
    this.abasService.abrirModalAbas?.();
  }
}