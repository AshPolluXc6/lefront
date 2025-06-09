import * as Models from '../core/models';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { ADMIN_COMPONENTS_IMPORTS } from './admin.imports.componen';
import { poTypesUI } from '../po.imports';



@Component({
    selector: 'app-admin',
    standalone: true,
    imports: [
      RouterOutlet,
      CommonModule,
      ...ADMIN_COMPONENTS_IMPORTS,
    ],
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  constructor(
    private rout: Router,
  ) {}

  ngOnInit(): void {

  }

  usuarios: any[] = [];
  publicacao: any[]= [];

  profile: Models.profile = {  title: '', subtitle: '', img: ''};



  // -------------^ Vars ^-----------------
menuItems: Array<poTypesUI['menuItem']> = [
  
    { label: 'Inicio',
      icon: 'an-fill an-squares-four',
      link: '', 
      shortLabel:'teste' },
      
    { label: 'Publicações', 
      icon: 'an-fill an-book-bookmark', 
      action: () => this.goToArticles(),
      link: '', 
      shortLabel:'prevenda' },

    { label: 'Cadastros', 
      icon: 'an-fill an-clipboard-text', 
      link: '/contact', 
      shortLabel:'Cadastros',
      subItems: [
      {
        label: 'Cargos',
        icon: 'an-fill an-users',
        link: '',
        shortLabel: 'Cargos'
      },
      {
        label:'Categorias',
        icon: 'an-fill an-text-indent',
        link: '',
        shortLabel:'Categorias',
      },
      {
        label: 'Usuarios',
        icon: 'an-fill an-users',
        link: '',
        shortLabel: 'Usuários'
      } ]
    },
    { 
      label: 'Permissões', 
      icon: 'an-fill an-user-check', 
      link: '', 
      shortLabel:'Permissões' 
    }
  ]; 
  
  // readonly actions: Array<poTypesUI['toolbarAction']> = [
  //     { label: 'New task', action: () => this.onNewtask(), icon: 'po-icon-plus' }
  //   ];
  
  readonly notifications: Array<poTypesUI['toolbarAction']> = [
      { label: 'Nova notificação', action: () => this.onNewtask(), icon: 'po-icon-mail' }
    ];
  
  readonly profileActs: Array<poTypesUI['toolbarAction']> = [
      { label: 'Perfil', action: () => this.abrirModal(), icon: 'po-icon-user' },
      { label: 'Sair', action: () => this.logout(), icon: 'po-icon-exit', type: 'danger' }
    ];

  // Po Types ^ ------------------------------

  private onNewtask(): void {
      alert('Nova tarefa');
  }
  private abrirModal(): void {
      alert('Nova tarefa');
  }
  private logout(): void {
      alert('Nova tarefa');
  }

  goToArticles(){
    this.rout.navigate(['/admin/articles']);
  }


//  Garbage ------------
 isAdmimRoute(): boolean {
    return this.rout.url.includes('/admim');
  }
}
