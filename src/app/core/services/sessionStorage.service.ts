import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, distinctUntilChanged, filter } from 'rxjs';
import { Router } from '@angular/router';

export interface Aba<T = any> {
  id: string;
  label: string;
  link: string;
  icon?: string;
  fixo?: boolean;
  dados?: T;
}

@Injectable({
  providedIn: 'root',
})
export class AbasService {
  
  private abasAbertasSubject = new BehaviorSubject<Aba[]>(this.carregarAbas());
  public abasAbertas$ = this.abasAbertasSubject.asObservable();
  private _abrirModalAbasFn: (() => void) | null = null;

  constructor(private router: Router) {}

  // ===============================
  // PÚBLICOS
  // ===============================

  abrirAbaPrincipal(basePath: string, label: string, icon?: string): void {
  const abas = this.abasAbertasSubject.getValue();
  const idAba = basePath;

  if (!abas.some(a => a.id === idAba)) {
    const novaAba: Aba = {
      id: idAba,
      link: basePath,
      label,
      icon,
      fixo: true
    };
    this.atualizarAbas([...abas, novaAba]);
  }

  this.router.navigateByUrl(basePath);
  }
  
  getAbas(): Observable<Aba[]> { return this.abasAbertas$; }
  getAbaPrincipal(): Aba | undefined { return this.abasAbertasSubject.value.find(aba => aba.fixo); }
  getAbasSync(): Aba[] { return this.abasAbertasSubject.getValue(); }
  getAbaById(id: string): Observable<Aba | undefined> {
    return this.abasAbertas$.pipe(
      map(abas => abas.find(a => a.id === id)),
      filter(Boolean),
      distinctUntilChanged()
    );
  }




salvarRascunhoAtual<T = any>(dadosParciais: Partial<T>): void {
  const urlAtual = this.router.url;
  const abas = [...this.abasAbertasSubject.getValue()];
  const index = abas.findIndex(aba => aba.link === urlAtual);

  if (index !== -1) {
    abas[index] = {
      ...abas[index],
      dados: {
        ...abas[index].dados,
        ...dadosParciais,
        status: 'draft'
      }
    };
    this.atualizarAbas(abas);
  }
}


 abrirAba<T = any>(config: {
  basePath: string;
  id?: string | number | null;
  label?: string;
  icon?: string;
  fixo?: boolean;
  dados?: T;
  navegar?: boolean;
}): void {
  const abasAtuais = this.abasAbertasSubject.getValue();

  // Gera ID único para a aba (basePath + id)
  const idAba = config.id ? `${config.basePath}|${config.id}` : config.basePath;
  
  // Gera o link de navegação
  const link = config.id ? `${config.basePath}/${config.id}` : config.basePath;

  // Determina o label automaticamente se não fornecido
  const label = config.label ?? 
    (config.id === 'novo' ? 'Novo' : 
    (config.id ? `Item ${config.id}` : 'Principal'));

  // Verifica se a aba já existe
  const abaExistente = abasAtuais.find(a => a.id === idAba);
  
  if (abaExistente) {
    // Atualiza os dados se necessário
    if (config.dados) {
      this.atualizarAba(idAba, { dados: config.dados });
    }
    
    if (config.navegar !== false) {
      this.router.navigateByUrl(link);
    }
    return;
  }

  // Cria nova aba
  const novaAba: Aba<T> = {
    id: idAba,
    label,
    link,
    icon: config.icon,
    fixo: config.fixo ?? false,
    dados: config.dados
  };

  this.atualizarAbas([...abasAtuais, novaAba]);

  if (config.navegar !== false) {
    this.router.navigateByUrl(link);
  }
}

getDadosAbaAtual<T>(): T | null {
  const url = this.router.url;
  const abas = this.abasAbertasSubject.getValue();
  const aba = abas.find(a => a.link === url);
  return aba ? aba.dados as T : null;
}


atualizarAbaPorLink(link: string, novosDados: Partial<Aba>): void {
  const abas = [...this.abasAbertasSubject.value];
  const index = abas.findIndex(a => a.link === link);
  
  if (index !== -1) {
    abas[index] = { ...abas[index], ...novosDados };
    this.atualizarAbas(abas);
  }
}


  fecharAba(id: string): void {
  const abasAtuais = [...this.abasAbertasSubject.value];
  const abaFechada = abasAtuais.find(a => a.id === id);
  const novasAbas = abasAtuais.filter(a => a.id !== id || a.fixo);
  
  // Verifica se a aba fechada era a ativa
  const abaAtivaFoiFechada = abaFechada && this.router.url === abaFechada.link;
  
  // Verifica se não há mais abas não fixas
  const sobraApenasPrincipal = novasAbas.length === 1 && novasAbas[0].fixo;
  
  if (abaAtivaFoiFechada || sobraApenasPrincipal) {
    const abaPrincipal = this.getAbaPrincipal();
    if (abaPrincipal) {
      // Forçar recriação do componente principal
      this.router.navigateByUrl('/blank', { skipLocationChange: true }).then(() => {
        this.router.navigateByUrl(abaPrincipal.link);
      });
    }
  }

  this.atualizarAbas(novasAbas);
  }

  getAbaPorLink(link: string): Aba | undefined {
  return this.abasAbertasSubject.value.find(a => a.link === link);
  }

  atualizarAba<T = any>(id: string, novosDados: Partial<Aba<T>>): void {
    const abas = this.abasAbertasSubject.value.map(aba =>
      aba.id === id ? { ...aba, ...novosDados } : aba
    );
    this.atualizarAbas(abas);
  }

  limparTodasAbas(): void {
    this.atualizarAbas([]);
  }

  // ===============================
  // PRIVADOS
  // ===============================

  private atualizarAbas(abas: Aba[]): void {
    this.abasAbertasSubject.next(abas);
    sessionStorage.setItem('abasAbertas', JSON.stringify(abas));
  }

  private carregarAbas(): Aba[] {
    try {
      return JSON.parse(sessionStorage.getItem('abasAbertas') || '[]');
    } catch {
      return [];
    }
  }

  private gerarLabel(link: string): string {
    const partes = link.split('/');
    const ultima = partes[partes.length - 1] || 'Aba';
    return ultima.charAt(0).toUpperCase() + ultima.slice(1);
  }

  private slug(texto: string): string {
    return texto.replace(/[^\w]+/g, '-').toLowerCase();
  }

  registrarAbrirModalAbas(fn: () => void) {
    this._abrirModalAbasFn = fn;
  }

  abrirModalAbas() {
    this._abrirModalAbasFn?.();
  }

  private getAbaAtiva(): Aba | undefined {
  return this.abasAbertasSubject.value.find(a => 
    this.router.url.startsWith(a.link)
  );
}
}
