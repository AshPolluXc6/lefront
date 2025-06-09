import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../core/services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Queries } from '../../core/querys/queries';
import { PoPageDynamicTableModule } from '@po-ui/ng-templates';
import { PoPageDynamicTableOptions } from '@po-ui/ng-templates';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-article',
  imports: [PoPageDynamicTableModule],
  templateUrl: './article.component.html',
  styleUrl: './article.component.scss'
})
export class ArticleComponent implements OnInit{
 serviceApi = '/api/query';

 readonly metadata: any = {
    version: 1,
    title: 'Publicações',
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
      action: this.abrirUsuario.bind(this),
      icon: 'po-icon-eye'
    }
  ];

  constructor(private api: ApiService,
    private rout: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // this.loadData;
  }


  abrirUsuario(row: any): void {
  const id = row.id;
  this.rout.navigate([`/admin/articles/editor`, id]);
}
}