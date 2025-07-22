// module-tabs.service.ts
import { Injectable } from '@angular/core';
import { AbasService } from './sessionStorage.service';

@Injectable({ providedIn: 'root' })
export class ModuleTabsService {
  constructor(private abasService: AbasService) {}
    
  initModule(
    modulePath: string, 
    moduleName: string, 
    icon?: string
  ) {
    this.abasService.abrirAbaPrincipal(modulePath, moduleName, icon);
    return this;
  }

  openItem(item: any, resourcePath: string, labelTemplate: string = 'Editando {nome}') {
    const label = labelTemplate.replace('{nome}', item.nome || item.title || item.id);
    
    this.abasService.abrirAba({
      basePath: resourcePath,
      id: item.id,
      label,
      dados: item
    });
  }

  newItem(resourcePath: string, defaults: any = {}) {
    const novoId = 'novo-' + Date.now();
    
    this.abasService.abrirAba({
      basePath: resourcePath,
      id: novoId,
      label: 'Novo',
      dados: { ...defaults, status: 'draft' }
    });
  }
}