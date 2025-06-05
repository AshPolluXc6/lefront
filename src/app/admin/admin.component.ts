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
  
    { label: 'Home',
      icon: 'an-fill an-house',
      link: '/home', 
      shortLabel:'teste' },
      
    { label: 'Prevenda', 
      icon: 'an-fill an-shopping-cart-simple', 
      link: '/home/prevenda', 
      shortLabel:'prevenda' },

    { label: 'Ação personalizada', 
      icon: 'po-icon-star', 
      link: '/contact', 
      shortLabel:'teste' },

    { link: 'teste', 
      label: 'PO ICON', 
      icon: 'an-fill an-hand-fist', 
      shortLabel:'teste' }
  ]; 
  
  readonly actions: Array<poTypesUI['toolbarAction']> = [
      { label: 'New task', action: () => this.onNewtask(), icon: 'po-icon-plus' }
    ];
  
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




  
}
