import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../core/services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Queries } from '../../core/querys/queries';
import { PoPageDynamicTableModule } from '@po-ui/ng-templates';
import { ICONS_DICTIONARY, PoModule } from '@po-ui/ng-components';
import { PoPageDynamicTableOptions } from '@po-ui/ng-templates';
import { lastValueFrom } from 'rxjs';
import { ModuleTabsService } from '../../core/services/module-tabs.service';

@Component({
  selector: 'app-article',
  imports: [PoPageDynamicTableModule,PoModule],
  templateUrl: './article.component.html',
  styleUrl: './article.component.scss'
})
export class ArticleComponent implements OnInit{
 serviceApi = '/api/query';

 readonly metadata: any = {
    version: 1,
    fields: [
      { property: 'id', label: 'Identificador' },
      { property: 'nome', label: 'Nome', key: true },
      { property: 'imagemcapa', label: 'Capa' },
      { property: 'imagem', label: 'Imagem' },
      { property: 'data', label: 'Data de Publicação' },
      { property: 'alteracao', label: 'Data de Alteraçaõ' },
      { property: 'nota', label: 'Nota' },
    ],
    keepFilters: true
  };

  // Custom action que será exibida como botão "Abrir"
  readonly tableCustomActions = [
    {
      label: 'Abrir',
      action: this.abrirArtigo.bind(this),
      icon: 'an-fill an-book-open-user'
    }
  ];

  readonly actions = {
    new: this.novoArtigo.bind(this),
    removeAll: this.onRemoveAll.bind(this) 
  };

  

  constructor(private api: ApiService,
    private rout: Router,
    private route: ActivatedRoute,
    private tabs: ModuleTabsService
  ) {}

  ngOnInit(): void {
  // Garanta que o caminho está correto
    this.tabs.initModule('/admin/articles', 'Artigos', 'an-fill an-list');
}

 abrirArtigo(row: any): void {
  this.tabs.openItem(row, '/admin/editor');
}

novoArtigo(): void {
  this.tabs.newItem('/admin/editor', {
    title: '',
    content: '',
    status: 'draft'
  });
}
onRemove(id: string, resource: any): boolean {
    console.log('Remover item com ID:', id);
    console.log('Recurso:', resource);
    return true; 
  }

  onRemoveAll(resources: any[]): any[] {
    console.log('Remover todos os itens:', resources);
    return resources;
  }
}